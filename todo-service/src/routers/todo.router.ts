import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';

const router = Router();
const todoController = new TodoController();

router.get('/todos/upcoming', todoController.getUpcomingTodos);
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodoById);
router.post('/todos', todoController.createTodo);
router.patch('/todos/:id', todoController.updateTodoById);
router.delete('/todos/:id', todoController.deleteTodoById);

export default router;
