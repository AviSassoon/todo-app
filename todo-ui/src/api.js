import axios from 'axios';

const fetchTodos = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_TODO_SERVICE_URL}/todos`
  );

  return response.data;
};

const fetchTodoById = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_TODO_SERVICE_URL}/todos/${id}`
  );

  return response.data;
};

const deleteTodoById = async (id) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_TODO_SERVICE_URL}/todos/${id}`
  );
  return response.data;
};

export { fetchTodos, fetchTodoById, deleteTodoById };
