import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './db/mongoose';
import todoRouter from './routers/todo.router';
import { HttpStatusCode } from './utils/http-status-code.enum';

const app = express();
app.use(express.json());
app.use(todoRouter);

const port = process.env.PORT || 3000;

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(HttpStatusCode.INTERNAL_SERVER).json('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

process
  .on('unhandledRejection', async (reason: Error, promise) => {
    const error = reason;
    console.error('Unhandled Rejection at:', promise, 'reason:', error);
  })
  .on('uncaughtException', async (error) => {
    console.error('Uncaught Exception thrown:', error);
  });
