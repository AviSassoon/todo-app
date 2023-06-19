import { TodoController } from './todo.controller';

describe('Todo Controller', () => {
  beforeAll(() => {
    jest.resetAllMocks();
    jest.mock('../models/todo.model', () => ({
      DbTodo: {
        find: jest.fn().mockResolvedValue([
          {
            _id: '1',
            title: 'Test Todo',
            description: 'Test Todo Description',
            deadline: new Date('2022-01-01T00:00:00.000Z'),
            completed: false,
          },
          {
            _id: '22',
            title: 'Clean the house',
            description: 'Clean the house Description',
            deadline: new Date('2022-01-03T12:00:00.000Z'),
            completed: true,
          },
        ]),
      },
    }));
  });

  it('should get all upcoming todos', () => {
    const controller = new TodoController();
    controller.getUpcomingTodos({} as any, { json: jest.fn() } as any);
  });
});
