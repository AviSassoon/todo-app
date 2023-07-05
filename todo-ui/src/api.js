import axios from 'axios';

const fetchTodos = async () => {
  const response = await axios.get('http://localhost:3000/todos');

  return response.data;
};

const fetchTodoById = async (id) => {
  const response = await axios.get(`http://localhost:3000/todos/${id}`);

  return response.data;
};

const deleteTodoById = async (id) => {
  const response = await axios.delete(`http://localhost:3000/todos/${id}`);
  return response.data;
};

export { fetchTodos, fetchTodoById, deleteTodoById };
