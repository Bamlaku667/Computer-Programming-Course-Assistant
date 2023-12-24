import React, { useState } from 'react'
import { useAuth } from '../authentication/Auth'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useAuth()
  const location = useLocation()
  const redirectPath = location.state?.path || '/profile'
  const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault();
    const loggingUser = {email, password}
    console.log("Form submitted:", loggingUser);
    try {
      const response = await axios.post('https://my-jobs-api.cyclic.app/api/v1/auth/login', {
        email,
        password,
      });
      console.log('login successful:', response.data);
      auth.login(response.data)
      navigate(redirectPath, {replace: true})
    } catch (error) {
      console.error('Registration failed:', error.response?.data || 'Unexpected error');
      setError('Login failed. Please try again.');
    }
  }
  return (
    <div>
          <label>Email: </label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <label>Password: </label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button onClick={handleClick}>Login</button>
    </div>
  )
}
