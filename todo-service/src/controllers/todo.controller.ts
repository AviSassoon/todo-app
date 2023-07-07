import { Request, Response, NextFunction } from 'express';
import { Todo } from '../models/todo.model';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import { TodoNotFoundError } from '../errors/todo-not-found-error';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
export class TodoController {
  static async getTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await Todo.find();

      res.json(todos);
    } catch (error) {
      next(error);
    }
  }

  static async getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const todo = await Todo.findById(id);

      if (!todo) {
        throw new TodoNotFoundError();
      }

      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  static async getUpcomingTodos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const upcomingTasks = await Todo.aggregate([
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
        {
          $project: {
            msDifference: 0,
          },
        },
      ]);

      res.json(upcomingTasks);
    } catch (error) {
      next(error);
    }
  }

  static async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, deadline, completed } = req.body;
      const todo = Todo.build({ title, description, deadline, completed });
      await todo.save();

      res.status(HttpStatusCode.CREATED).json(todo);
    } catch (error) {
      next(error);
    }
  }

  static async updateTodoById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, description, deadline, completed } = req.body;

      const isValidUpdate = TodoController.assertValidTodo(req);

      if (!isValidUpdate) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ error: 'Invalid update fields.' });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { title, description, deadline, completed },
        { new: true }
      );

      if (updatedTodo) {
        return res.json(updatedTodo);
      }

      res.status(HttpStatusCode.NOT_FOUND).json('Todo not found');
    } catch (error) {
      next(error);
    }
  }

  static assertValidTodo(req: Request) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'deadline', 'completed'];
    return updates.every((update) => allowedUpdates.includes(update));
  }

  static async deleteTodoById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const deletedTodo = await Todo.findByIdAndDelete(id);

      if (!deletedTodo) {
        throw new TodoNotFoundError();
      }

      res.json(deletedTodo);
    } catch (error) {
      next(error);
    }
  }
}
