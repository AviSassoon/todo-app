import { Request, Response } from 'express';
import { DbTodo } from '../models/todo.model';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import { isWithinNext24Hours } from '../utils/date.utils';

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
      const uncompletedTasks = await DbTodo.find({ completed: false });
      const now = new Date();

      const upcomingTasks = uncompletedTasks.filter(
        (task) => !isWithinNext24Hours(now, task.deadline)
      );

      res.json(upcomingTasks);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const todo = await DbTodo.create(req.body);
      res.json(todo);
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
