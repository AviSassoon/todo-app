import { Request, Response } from 'express';
import { Todo } from '../models/todo.model';
import { HttpStatusCode } from '../utils/http-status-code.enum';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
export class TodoController {
  async getTodos(req: Request, res: Response) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async getTodoById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const todo = await Todo.findById(id);

      res.json(todo);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async getUpcomingTodos(req: Request, res: Response) {
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
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const { title, description, deadline, completed } = req.body;
      const todo = Todo.build({ title, description, deadline, completed });
      await todo.save();

      res.status(HttpStatusCode.CREATED).json(todo);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  async updateTodoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, deadline, completed } = req.body;

      const isValidUpdate = this.assertValidTodo(req);

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
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }

  assertValidTodo(req: Request) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'deadline', 'completed'];
    return updates.every((update) => allowedUpdates.includes(update));
  }

  async deleteTodoById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deletedTodo = await Todo.findByIdAndDelete(id);

      if (!deletedTodo) {
        return res.status(HttpStatusCode.NOT_FOUND).json('Todo not found');
      }

      res.json(deletedTodo);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
  }
}
