import React from 'react';

const Todo = ({ todo }) => {
  return (
    <div className="todo">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.status ? "Completed" : "Not Completed"}</p>
      {/* Add other relevant information here */}
    </div>
  );
};

export default Todo;
