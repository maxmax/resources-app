import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, priority, authorEmail } = req.body;
    const result = await prisma.resource.create({
      data: {
        title,
        content,
        priority,
        status: 'Default',
        published: true,
        author: { connect: { email: authorEmail } },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource' });
  }
};

export const updateResource = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content, priority, status, published } = req.body;
  try {
    const resource = await prisma.resource.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        priority,
        status,
        published,
      },
    });
    res.json(resource);
  } catch (error) {
    res.status(404).json({ error: `Resource with ID ${id} does not exist` });
  }
};

export const deleteResource = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const resource = await prisma.resource.delete({
      where: { id: Number(id) },
    });
    res.json(resource);
  } catch (error) {
    res.status(404).json({ error: `Resource with ID ${id} does not exist` });
  }
};

export const getResourceById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const resource = await prisma.resource.findUnique({
      where: { id: Number(id) },
      include: {
        tasks: true,
      },
    });
    res.json(resource);
  } catch (error) {
    res.status(404).json({ error: `Resource with ID ${id} does not exist` });
  }
};

export const getResourcesByAuthorId = async (req: Request, res: Response): Promise<void> => {
  const { authorId } = req.params;
  try {
    const resources = await prisma.user
      .findUnique({
        where: { id: Number(authorId) },
      })
      .resources();
    res.json(resources);
  } catch (error) {
    res.status(404).json({ error: `User with ID ${authorId} does not exist` });
  }
};

// export const getAllResources = async (req: Request, res: Response): Promise<void> => {
//  try {
//    const resources = await prisma.resource.findMany();
//    res.json(resources);
//  } catch (error) {
//    res.status(500).json({ error: 'Failed to fetch resources' });
//  }
// };

export const getAllResources = async (req: Request, res: Response): Promise<void> => {
  try {
    const resources = await prisma.resource.findMany({
      include: {
        tasks: true,
      },
    });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};
