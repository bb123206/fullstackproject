// src/components/TaskItem.js
import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  if (!task) return null;

  // Safely check both potential API field names
  const isDone = task.is_completed ?? task.completed ?? false;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #eee',
      }}
    >
      {/* Task title with strikethrough if completed */}
      <span
        style={{
          textDecoration: isDone ? 'line-through' : 'none',
          color: isDone ? '#888' : '#000',
        }}
      >
        {task.title}
      </span>

      <div style={{ display: 'flex', gap: '8px' }}>
        {/* Toggle Finish/Undo Button */}
        <button
          onClick={() => onToggle(task)}
          style={{
            backgroundColor: isDone ? '#6c757d' : '#28a745',
            color: '#fff',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isDone ? 'Undo' : 'Finish'}
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          style={{
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;