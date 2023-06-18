import { Schema, model, Model } from 'mongoose';

interface Todo {
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
}

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

export const DbTodo: Model<Todo> = model<Todo>('Todo', TodoSchema);
