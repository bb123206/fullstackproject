import React, { useState, useEffect, useCallback } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import API from './api';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterView, setIsRegisterView] = useState(false); // Controls showing Login vs Register
  const [tasks, setTasks] = useState([]);

  // Logout handler
  const handleLogout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setTasks([]);
  }, []);

  // Fetch tasks from Django backend using JWT Token
  const fetchTasks = useCallback(async () => {
    try {
      const response = await API.get('tasks/');
      // Handle array or paginated response safely
      const taskData = Array.isArray(response.data) ? response.data : response.data.results || [];
      console.log('Fetched tasks from API:', taskData); // Debug log to inspect Django field names
      setTasks(taskData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  }, [handleLogout]);

  // Check login status on app launch
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      fetchTasks();
    }
  }, [fetchTasks]);

  // Add a new task
  const addTask = async (title) => {
    try {
      await API.post('tasks/', { title });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error.response?.data);
    }
  };

  // Toggle task completion status
  const toggleTask = async (task) => {
    // 1. Determine current status reliably regardless of API naming convention
    const currentStatus = task.is_completed ?? task.completed ?? false;
    const nextStatus = !currentStatus;

    try {
      // 2. Pass both field variations so Django accepts whichever field it uses
      await API.patch(`tasks/${task.id}/`, {
        is_completed: nextStatus,
        completed: nextStatus,
      });

      // 3. Immediately update local state or re-fetch tasks
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task:', error.response?.data || error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await API.delete(`tasks/${id}/`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // 1. Show Register screen if user clicks "Sign Up"
  if (!isLoggedIn && isRegisterView) {
    return (
      <Register 
        onSwitchToLogin={() => setIsRegisterView(false)} 
      />
    );
  }

  // 2. Show Login screen if user is not authenticated
  if (!isLoggedIn) {
    return (
      <Login 
        onLoginSuccess={() => { 
          setIsLoggedIn(true); 
          fetchTasks(); 
        }} 
        onSwitchToRegister={() => setIsRegisterView(true)} 
      />
    );
  }

  // Helper to reliably extract boolean completion state
  const checkIsCompleted = (task) => {
    if (typeof task.is_completed !== 'undefined') return Boolean(task.is_completed);
    if (typeof task.completed !== 'undefined') return Boolean(task.completed);
    return false;
  };

  // Separate tasks into active and completed
  const activeTasks = tasks.filter((task) => !checkIsCompleted(task));
  const completedTasks = tasks.filter((task) => checkIsCompleted(task));

  // 3. Show Main To-Do App when logged in
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Minimalist To-Do List</h2>
        <button 
          onClick={handleLogout} 
          style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Logout
        </button>
      </div>

      <TaskInput onAddTask={addTask} />
      
      <TaskList 
        tasks={tasks} 
        activeTasks={activeTasks} 
        completedTasks={completedTasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask} 
      />
    </div>
  );
}

export default App;