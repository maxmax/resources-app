import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './app/routes/users.routes';
import taskRoutes from './app/routes/task.routes';
import resourceRoutes from './app/routes/resource.routes';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// CORS middleware
const corsOptions = {
  origin: process.env.CORS_OPTIONS || "http://localhost:5173"
};
app.use(cors(corsOptions))

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to rest-server demo application." });
});

app.use('/api/users', userRoutes);

// Connect routes for users
app.use('/api/tasks', taskRoutes);
app.use('/api/resources', resourceRoutes);

const server = app.listen(3000, () =>
  console.log(`🦍 Server ready at: http://localhost:3000 🗿`),
)
