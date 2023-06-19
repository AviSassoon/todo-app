import React, { useState } from 'react';
import TodosList from './components/TodosList';
import { fetchTodos, fetchTodoById, deleteTodoById } from './api';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState('');
  const [singleTodo, setSingleTodo] = useState(null);

  const handleClick = async () => {
    const todos = await fetchTodos();
    setTodos(todos);
    setSingleTodo(null);
  };

  const handleFetchById = async () => {
    const todo = await fetchTodoById(todoId);
    setSingleTodo(todo);
    setTodoId('');
  };

  const handleDeleteById = async () => {
    const { _id } = await deleteTodoById(todoId);
    setTodos(todos.filter((todo) => todo._id !== _id));
    setTodoId('');
  };

  const handleIdChange = (event) => {
    setTodoId(event.target.value);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <button onClick={handleClick}>Fetch Todos</button>
      <div>
        <input
          type="text"
          value={todoId}
          onChange={handleIdChange}
          placeholder="Enter Todo ID"
        />
        <button onClick={handleFetchById}>Fetch Todo by ID</button>
        <button onClick={handleDeleteById}>Delete Todo by ID</button>
      </div>

      {singleTodo ? (
        <TodoItem todo={singleTodo} />
      ) : (
        <TodosList todos={todos} />
      )}
    </div>
  );
}

export default App;
