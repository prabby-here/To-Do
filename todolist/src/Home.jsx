import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await axios.get('https://to-do-backend-tv1z.onrender.com/get');
        setTodos(result.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to fetch todos');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

 
  const handleComplete = async (id) => {
    try {
      const result = await axios.put(`https://to-do-backend-tv1z.onrender.com/update/${id}`);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? { _id: todo._id, task: todo.task, done: true } : todo
        )
      );
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`https://to-do-backend-tv1z.onrender.com/delete/${id}`);
    
    setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};


  return (
    <div>
      <h1>ToDo List</h1>
      <Create setTodos={setTodos} />

      
      {loading ? <p>Loading tasks...</p> : null}

      
      {error ? <p>{error}</p> : null}

      <ul className="todo-list">
        {todos.length === 0 ? (
          <div><h2> Its Lonely here :( </h2></div>
        ) : (
          todos.map((todo) => (
            <li key={todo._id} className={`todo-item ${todo.done ? 'completed' : ''}`}>
              <span className={`todo-item-text ${todo.done ? 'line-through' : ''}`}>
                {todo.task}
              </span>
              <div className="todo-actions">
                {!todo.done && (
                  <button className="todo-btn complete" onClick={() => handleComplete(todo._id)}>
                    Complete
                  </button>
                )}
                <button className="todo-btn" onClick={() => handleDelete(todo._id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;
