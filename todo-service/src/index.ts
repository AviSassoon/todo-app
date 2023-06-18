import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './db/mongoose';
import todoRouter from './routers/todo.router';

const app = express();
app.use(express.json());
app.use(todoRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
