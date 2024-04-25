import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos }) => {
  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
