/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void; // Callback function for handling login
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password); // Call the parent function with user credentials
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-800 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-lg font-semibold text-center">Login</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-sm">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;