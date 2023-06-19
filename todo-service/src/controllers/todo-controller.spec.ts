import { TodoController } from './todo.controller';

describe('assertValidTodo', () => {
  it('should be valid todo to update', () => {
    const todoController = new TodoController();
    const req = {
      body: {
        title: 'title',
        description: 'description',
      },
    } as any;
    const isValidTodo = todoController.assertValidTodo(req);
    expect(isValidTodo).toBeTruthy();
  });

  it('should be invalid todo to update - unknown prop', () => {
    const todoController = new TodoController();
    const req = {
      body: {
        newTitle: 'title',
        description: 'description',
      },
    } as any;

    const isValidTodo = todoController.assertValidTodo(req);
    expect(isValidTodo).toBeFalsy();
  });

  it('should be invalid todo to update - forbidden prop ', () => {
    const todoController = new TodoController();
    const req = {
      body: {
        _id: '1223',
      },
    } as any;

    const isValidTodo = todoController.assertValidTodo(req);
    expect(isValidTodo).toBeFalsy();
  });
});
