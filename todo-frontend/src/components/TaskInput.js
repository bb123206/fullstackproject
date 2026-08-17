// src/components/TaskInput.js
import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (!title.trim()) return; // Prevents submitting empty strings
    onAddTask(title);
    setTitle(''); // Clear input box
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ flex: 1, padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Add Task
      </button>
    </form>
  );
}

export default TaskInput;