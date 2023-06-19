function TodoItem({ todo }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p>Deadline: {new Date(todo.deadline).toLocaleString()}</p>
      <p>Status: {todo.completed ? 'Completed' : 'Not completed'}</p>
      <p> Id: {todo._id}</p>
    </div>
  );
}

export default TodoItem;
