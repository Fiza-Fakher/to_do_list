import './App.css';
import React, { useState } from 'react';
import { RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1); // Remove the item at the given index
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = String(now.getDate()).padStart(2, '0');
    let mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    let yyyy = now.getFullYear();
    let h = String(now.getHours()).padStart(2, '0');
    let m = String(now.getMinutes()).padStart(2, '0');
    let s = String(now.getSeconds()).padStart(2, '0');
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let completedTodo = {
      ...allTodos[index],
      completedOn: completedOn
    };

    let updatedCompletedArr = [...completedTodos, completedTodo];
    setCompletedTodos(updatedCompletedArr);

    let updatedTodoArr = allTodos.filter((_, i) => i !== index); // Remove the completed todo from allTodos
    setTodos(updatedTodoArr);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(allTodos[index].title);
    setEditDescription(allTodos[index].description);
  };

  const handleUpdate = () => {
    let updatedTodos = [...allTodos];
    updatedTodos[editIndex] = {
      ...updatedTodos[editIndex],
      title: editTitle,
      description: editDescription,
    };
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's Your task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's Your task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add task
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            To-do
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        {editIndex !== null && (
          <div className="edit-form">
            <h3>Edit To-Do</h3>
            <div className="todo-input-item">
              <label>Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Update task title"
              />
            </div>
            <div className="todo-input-item">
              <label>Description</label>
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Update task description"
              />
            </div>
            <div className="todo-input-item">
              <button
                type="button"
                onClick={handleUpdate}
                className="primaryBtn"
              >
                Update Task
              </button>
            </div>
          </div>
        )}
        {!isCompleteScreen && allTodos.map((item, index) => (
          <div className="todo-list" key={index}>
            <div className="todo-list-item">
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <RiEdit2Line className="icon1" onClick={() => handleEdit(index)} />
                <RiDeleteBin7Line className="icon" onClick={() => handleDeleteTodo(index)} />
                <FaCheck className="check-icon" onClick={() => handleComplete(index)} />
              </div>
            </div>
          </div>
        ))}
        {isCompleteScreen && completedTodos.map((item, index) => (
          <div className="todo-list" key={index}>
            <div className="todo-list-item">
              <div>
                <h3>{item.title}</h3>
                <p><small>{item.description}</small></p>
                <p><small>Completed on: {item.completedOn}</small></p>
              </div>
              <div>
                {/* Optionally add a delete button for completed todos */}
                {/* <RiDeleteBin7Line className="icon" onClick={() => handleDeleteTodo(index)} /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
