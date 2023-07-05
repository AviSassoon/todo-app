import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { validateCreateTodo } from '../validators/create-todo.validator';
import { validateTodoById } from '../validators/todo-by-id.validator';

const router = Router();

router.get('/todos/upcoming', TodoController.getUpcomingTodos);
router.get('/todos', TodoController.getTodos);
router.get('/todos/:id', validateTodoById, TodoController.getTodoById);
router.post('/todos', validateCreateTodo, TodoController.createTodo);
router.patch('/todos/:id', TodoController.updateTodoById);
router.delete('/todos/:id', validateTodoById, TodoController.deleteTodoById);

export default router;
