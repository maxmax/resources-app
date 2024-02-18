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

export const getResourcesByTaskDateRange = async (req: Request, res: Response): Promise<void> => {
  const { start, end } = req.query;

  try {
    // Find all tasks whose dates intersect with the selected period
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          // The start of the task falls within the selected period
          {
            AND: [
              { start: { lte: new Date(end as string) } }, // Start until the end of the period
              { start: { gte: new Date(start as string) } }, // Start after the start of the period
            ],
          },
          // The end of the task falls within the selected period
          {
            AND: [
              { end: { lte: new Date(end as string) } }, // End to end of period
              { end: { gte: new Date(start as string) } }, // End after the start of the period
            ],
          },
          // The task is entirely within the selected period
          {
            AND: [
              { start: { lte: new Date(start as string) } }, // Start before the start of the period
              { end: { gte: new Date(end as string) } }, // End after the end of the period
            ],
          },
        ],
      },
    });

    // Get unique resource identifiers associated with the found tasks
    const resourceIds = Array.from(new Set(tasks.map(task => task.resourceId)));

    // Get resources associated with the found identifiers
    const resources = await prisma.resource.findMany({
      where: {
        id: { in: resourceIds }, // Filter resources to get only those that are related to the found tasks
      },
      include: {
        tasks: true, // Enable tasks for each resource
      },
    });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources by task date range' });
  }
};

export const getResourcesByTaskStatus = async (req: Request, res: Response): Promise<void> => {
  const { status } = req.query;

  try {
    // Find all resources that have tasks with the specified status
    const resources = await prisma.resource.findMany({
      where: {
        tasks: {
          some: {
            status: String(status),
          },
        },
      },
      include: {
        tasks: {
          where: {
            status: String(status),
          },
        },
      },
    });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources by task status' });
  }
};
