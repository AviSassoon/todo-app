import React, { useState } from 'react';
import TodosList from './components/TodosList';
import fetchTodos from './api';

function App() {
  const [todos, setTodos] = useState([]);

  const handleClick = async () => {
    const todos = await fetchTodos();
    setTodos(todos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <button onClick={handleClick}>Fetch Todos</button>
      <TodosList todos={todos} />
    </div>
  );
}

export default App;
