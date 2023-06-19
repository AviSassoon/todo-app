import axios from 'axios';

const fetchTodos = async () => {
  console.log(
    'REACT_APP_TODO_SERVICE_URL',
    `${process.env.REACT_APP_TODO_SERVICE_URL}/todos`
  );
  const response = await axios.get(
    `${process.env.REACT_APP_TODO_SERVICE_URL}/todos`
  );

  return response.data;
};

export default fetchTodos;
