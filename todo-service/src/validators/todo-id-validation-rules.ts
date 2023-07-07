import { param } from 'express-validator';

export const todoIdValidationRules = [
  param('id').notEmpty().withMessage('Todo ID is required'),
];
