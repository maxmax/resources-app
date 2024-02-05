import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, resources, tasks } = req.body;

  const resourceData = resources?.map((resource: Prisma.ResourceCreateInput) => {
    return { title: resource?.title, content: resource?.content, priority: resource?.priority, status: resource?.status };
  });

  const taskData = tasks?.map((task: Prisma.TaskCreateInput) => {
    return {
      title: task?.title,
      content: task?.content,
      status: task?.status,
      priority: task?.priority,
      start: task?.start,
      end: task?.end,
    };
  });

  const result = await prisma.user.create({
    data: {
      name,
      email,
      resources: {
        create: resourceData,
      },
      tasks: {
        create: taskData,
      },
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
