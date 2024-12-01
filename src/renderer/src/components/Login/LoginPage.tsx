import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 font-sans">
    
      <div className="p-6 bg-white rounded shadow-md w-96">

        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Bookmarkly</h1>

        <h2 className="text-2xl font-bold text-center mb-4">
          {isCreatingAccount ? 'Create an Account' : 'Sign in'}
        </h2>

        <p className="text-center text-gray-600 mb-6">
          {isCreatingAccount ? 'Join Bookmarkly to manage your bookmarks.' : 'Easily manage your bookmarks'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm text-blue-500">
                {showPassword ? 'hide' : 'show'}
              </button>
            </div>
          </div>
          <div className="text-right">
            <a href="#" className="text-blue-500 text-sm hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
            {isCreatingAccount ? 'Create Account' : 'Sign in'}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-600 mt-4">
          {isCreatingAccount ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsCreatingAccount(false)}
                className="text-blue-500 hover:underline">
                Sign in
              </button>
            </>
          ) : (
            <>
              New to Bookmarkly?{' '}
              <button
                onClick={() => setIsCreatingAccount(true)}
                className="text-blue-500 hover:underline">
                Join now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
