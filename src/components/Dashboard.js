import React, { useState, useEffect } from 'react';
import Header from "./Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css'; 

function EditTodoForm({ todo, onSave, onCancel }) {
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value
    });
  };

  const handleSave = () => {
    onSave(editedTodo);
  };

  return (
    <div className="edit-form-container">
      <h3>Edit Todo</h3>
      <input
        type="text"
        name="title"
        className='input-e'
        value={editedTodo.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        className='input-e'
        value={editedTodo.description}
        onChange={handleInputChange}
      />
      <button onClick={handleSave} className='delete-button'>Save</button>
      <button onClick={onCancel} className='edit-button'>Cancel</button>
    </div>
  );
}

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editableTodo, setEditableTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetching todos from API can be removed
  }, []);

  const handleCreateTodo = async (newTodoData) => {
    try {
      setTodos([...todos, newTodoData]);
      setNewTodo({
        title: '',
        description: '',
        completed: false
      });
      toast.success('Todo created successfully');
      console.log('Todo created successfully:', newTodoData);
    } catch (error) {
      toast.error('Failed to create todo');
      console.error('Error creating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setTodos(todos.filter(todo => todo.id !== id));
      toast.success('Todo deleted successfully');
      console.log('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (todo) => {
    setEditableTodo(todo);
    setIsEditing(true);
  };

  const handleSaveEdit = (editedTodo) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === editedTodo.id) {
        return editedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setIsEditing(false);
    toast.success('Todo edited successfully');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h3>Create Todo</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!isEditing) {
              handleCreateTodo({
                id: todos.length + 1,
                title: newTodo.title,
                description: newTodo.description,
                completed: false
              });
            }
          }}>
            <input
              type="text"
              placeholder="Title"
              className='input'
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
            <input
              type="text"
              className='input'
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
            {!isEditing && <button type="submit" className="delete-button">Create Todo</button>}
          </form>
        </div>
        <div className="dashboard-content">
          <h3>Todos</h3>
          <input
            type="text"
            className='input'
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredTodos.map(todo => (
              <li key={todo.id} className="todo-item">
                {isEditing && editableTodo && editableTodo.id === todo.id ? (
                  <EditTodoForm
                    todo={editableTodo}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <>
                    <strong>{todo.title}</strong>
                    <p>{todo.description}</p>
                    <div>
                      <button onClick={() => handleEditTodo(todo)} className="edit-button">Edit</button>
                      <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Dashboard;
