import { Request, Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

// REGISTRAR UM NOVO USUÁRIO

export const register = async (req: Request, res: Response) => {
  const { nome, email, senha, role } = req.body;

  try {
    const usuarioExistente = await prisma.user.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.user.create({
      data: {
        nome,
        email,
        senhaHash,
        role: role in Role ? role : 'viewer', // garante que o role é válido
      },
    });

    return res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      role: novoUsuario.role,
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao registrar usuário.' });
  }
};

// LOGIN

const SECRET = process.env.JWT_SECRET || 'chave-secreta-padrao';

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.user.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ erro: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      SECRET,
      { expiresIn: '1d' }
    );

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao realizar login.' });
  }
};