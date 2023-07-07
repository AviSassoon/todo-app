import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { createTodoValidationRules } from '../validators/create-todo-validation-rules';
import { todoIdValidationRules } from '../validators/todo-id-validation-rules';
import { validateRequest } from '../middlewares/validate-request';

const router = Router();

router.get('/todos/upcoming', TodoController.getUpcomingTodos);
router.get('/todos', TodoController.getTodos);
router.get(
  '/todos/:id',
  todoIdValidationRules,
  validateRequest,
  TodoController.getTodoById
);
router.post(
  '/todos',
  createTodoValidationRules,
  validateRequest,
  TodoController.createTodo
);
router.patch('/todos/:id', TodoController.updateTodoById);
router.delete(
  '/todos/:id',
  todoIdValidationRules,
  validateRequest,
  TodoController.deleteTodoById
);

export default router;
