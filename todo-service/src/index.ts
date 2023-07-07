import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/mongoose';
import todoRouter from './routers/todo.router';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(todoRouter);

  const port = process.env.PORT || 3000;
  await connectDB();

  app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
  });

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
};

process
  .on('unhandledRejection', async (reason: Error, promise) => {
    const error = reason;
    console.error('Unhandled Rejection at:', promise, 'reason:', error);
  })
  .on('uncaughtException', async (error) => {
    console.error('Uncaught Exception thrown:', error);
  });

startServer();
