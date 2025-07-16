import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

export const criarPlantao = async (req: AuthenticatedRequest, res: Response) => {
  const { data, plantonistaInternoId, plantonistaExternoId, houveAtendimentoExterno, observacoes } = req.body;

  try {
    const existe = await prisma.plantao.findUnique({
      where: { data: new Date(data) },
    });

    if (existe) return res.status(400).json({ erro: 'Já existe plantão nesta data.' });

    const interno = await prisma.plantonista.findUnique({ where: { id: plantonistaInternoId } });
    const externo = await prisma.plantonista.findUnique({ where: { id: plantonistaExternoId } });

    if (!interno || !externo) {
      return res.status(400).json({ erro: 'Plantonista(s) inválido(s).' });
    }

    const plantao = await prisma.plantao.create({
      data: {
        data: new Date(data),
        plantonistaInternoId,
        plantonistaExternoId,
        houveAtendimentoExterno,
        observacoes,
      },
    });

    return res.status(201).json(plantao);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao criar plantão.' });
  }
};

export const listarPlantoesPorMes = async (req: AuthenticatedRequest, res: Response) => {
  const { mes, ano } = req.query;

  if (!mes || !ano) {
    return res.status(400).json({ erro: 'Informe o mês e o ano.' });
  }

  const primeiroDia = new Date(`${ano}-${mes}-01`);
  const ultimoDia = new Date(`${ano}-${mes}-31`);

  try {
    const plantoes = await prisma.plantao.findMany({
      where: {
        data: {
          gte: primeiroDia,
          lte: ultimoDia,
        },
      },
      include: {
        plantonistaInterno: true,
        plantonistaExterno: true,
        atendimentos: true,
      },
      orderBy: {
        data: 'asc',
      },
    });

    return res.json(plantoes);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar plantões.' });
  }
};
