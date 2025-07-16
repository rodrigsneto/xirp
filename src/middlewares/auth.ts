import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from '@prisma/client';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'chave-padrao';

export interface TokenPayload {
  id: number;
  role: Role;
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest extends Request {
  usuario?: {
    id: number;
    role: Role;
  };
}

export const autenticar = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET) as TokenPayload;

    req.usuario = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};
