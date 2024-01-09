import React, { useState } from 'react';
import { useAuth } from '../authentication/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.path || '/profile';
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const loggingUser = { email, password };
    console.log('Form submitted:', loggingUser);
    try {
      const response = await axios.post(
        'https://my-jobs-api.cyclic.app/api/v1/auth/login',
        {
          email,
          password,
        }
      );
      console.log('Login successful:', response.data);
      auth.login(response.data);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error(
        'Login failed:',
        error.response?.data || 'Unexpected error'
      );
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-primary text-white rounded-md">
      <label className="block mb-2">Email:</label>
      <input
        type="text"
        className="w-full p-2 mb-4 bg-soft text-dark-light rounded-md"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="block mb-2">Password:</label>
      <input
        type="password"
        className="w-full p-2 mb-4 bg-soft text-dark-light rounded-md"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        className="bg-dark-soft hover:text-white text-primary py-2 px-4 rounded-md"
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  );
};

