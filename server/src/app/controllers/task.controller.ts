import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, status, priority, start, end, resourceId, authorEmail } = req.body;
    const result = await prisma.task.create({
      data: {
        title,
        content,
        status,
        priority,
        start,
        end,
        resource: { connect: { id: resourceId } },
        author: { connect: { email: authorEmail } },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content, status, priority, start, end, resourceId, authorEmail } = req.body;
  try {
    const result = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        status,
        start,
        end,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: `Task with ID ${id} does not exist` });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: `Task with ID ${id} does not exist` });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: `Task with ID ${id} does not exist` });
  }
};

export const getTasksByResourceId = async (req: Request, res: Response): Promise<void> => {
  const { resourceId } = req.params;
  try {
    const tasks = await prisma.resource
      .findUnique({
        where: { id: Number(resourceId) },
      })
      .tasks();
    res.json(tasks);
  } catch (error) {
    res.status(404).json({ error: `Resource with ID ${resourceId} does not exist` });
  }
};

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};
