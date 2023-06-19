import { Request, Response } from 'express';
import { DbTodo } from '../models/todo.model';
import { HttpStatusCode } from '../utils/http-status-code.enum';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
export class TodoController {
  async getTodos(req: Request, res: Response) {
    try {
      const todos = await DbTodo.find();
      res.json(todos);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async getTodoById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const todo = await DbTodo.findById(id);

      res.json(todo);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async getUpcomingTodos(req: Request, res: Response) {
    try {
      const upcomingTasks = await DbTodo.aggregate([
        { $match: { completed: false } },
        {
          $addFields: {
            msDifference: { $subtract: ['$$NOW', '$deadline'] },
          },
        },
        {
          $match: {
            msDifference: { $gte: -1 * ONE_DAY_IN_MILLISECONDS },
          },
        },
      ]);

      res.json(upcomingTasks);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const todo = await DbTodo.create(req.body);
      res.status(HttpStatusCode.CREATED).json(todo);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async updateTodoById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const updates = req.body;

      const updateTodo = await DbTodo.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (updateTodo) {
        return res.json(updateTodo);
      }

      res.status(HttpStatusCode.NOT_FOUND).json('Todo not found');
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async deleteTodoById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deletedTodo = await DbTodo.findByIdAndDelete(id);

      if (!deletedTodo) {
        return res.status(HttpStatusCode.NOT_FOUND).json('Todo not found');
      }

      res.json(deletedTodo);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }
}
