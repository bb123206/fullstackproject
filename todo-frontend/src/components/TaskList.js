import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks = [], activeTasks, completedTasks, onToggle, onDelete }) {
  // Helper to reliably read boolean completion state
  const isTaskCompleted = (task) => {
    if (typeof task.is_completed !== 'undefined') return Boolean(task.is_completed);
    if (typeof task.completed !== 'undefined') return Boolean(task.completed);
    return false;
  };

  // Use props passed from App.js if available; otherwise, filter locally using the helper
  const active = activeTasks ?? tasks.filter((t) => !isTaskCompleted(t));
  const completed = completedTasks ?? tasks.filter((t) => isTaskCompleted(t));

  return (
    <div>
      <h3>Active Tasks</h3>
      {active.length === 0 ? (
        <p style={{ color: '#666' }}>No active tasks.</p>
      ) : (
        active.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}

      <h3 style={{ marginTop: '30px' }}>Completed Tasks</h3>
      {completed.length === 0 ? (
        <p style={{ color: '#666' }}>No completed tasks yet.</p>
      ) : (
        completed.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;