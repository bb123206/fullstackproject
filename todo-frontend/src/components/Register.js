import React, { useState } from 'react';
import API from '../api'; // Uses your centralized Axios configuration

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Correctly calls your Django register endpoint via your API instance
      await API.post('register/', { username, password });
      setMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => onSwitchToLogin(), 1500); // Redirect to login after 1.5s
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div style={{ maxWidth: '350px', margin: '50px auto', textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Sign Up</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
        />
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', margin: '10px 0', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Create Account
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Already have an account?{' '}
        <span 
          onClick={onSwitchToLogin} 
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;