import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const result = await prisma.user.create({
    data: {
      name,
      email
    },
  });

  res.json(result);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      resources: true,
      tasks: true,
    },
  });

  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      resources: true,
      tasks: true,
    },
  });

  res.json(user);
};

export const getUserDrafts = async (req: Request, res: Response) => {
  const { id } = req.params;

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .resources({
      where: { published: false },
    });

  res.json(drafts);
};
