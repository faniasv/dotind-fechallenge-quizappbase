import React from 'react';

const Login = ({ username, setUsername, handleStart, loading }) => {
  return (
    <div className="card">
      <h1>Quiz One-Two-Three</h1>
      <p>Enter your name to start the challenge!</p>
      <input 
        type="text" 
        placeholder="Type your name here..."
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleStart} disabled={loading}>
        {loading ? "Hang tight, Jarvis is fetching the questions..." : "Start Quiz"}
      </button>
    </div>
  );
};

export default Login;