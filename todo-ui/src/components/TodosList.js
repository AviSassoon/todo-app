import TodoItem from './TodoItem';

function TodosList({ todos }) {
  const renderedTodos = todos.map((todo) => (
    <TodoItem key={todo._id} todo={todo} />
  ));
  return <div>{renderedTodos}</div>;
}

export default TodosList;
