import { param } from 'express-validator';

export const validateTodoById = [
  param('id').notEmpty().withMessage('Todo ID is required'),
];
