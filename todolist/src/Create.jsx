import React, { useState } from 'react';
import axios from 'axios';

function Create({ setTodos }) {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState('');  

  const handleAdd = async () => {
    if (!task.trim()) {
      alert('Task cannot be empty');  
      return;
    }

    setLoading(true); 
    setError('');  

    try {
      const result = await axios.post('http://localhost:3001/add', { task: task });
      console.log(result.data);
      setTodos(prevTodos => [...prevTodos, result.data]);  
      setTask(''); 
    } catch (err) {
      console.error(err);
      setError('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='create_form'>
      <input 
        type="text" 
        placeholder='Enter Task' 
        value={task}
        onChange={(e) => setTask(e.target.value)} 
      />
      <button 
        type="button" 
        onClick={handleAdd} 
        disabled={!task.trim() || loading}  
      >
        {loading ? 'Adding...' : 'Add Task'}  
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </div>
  );
}

export default Create;
