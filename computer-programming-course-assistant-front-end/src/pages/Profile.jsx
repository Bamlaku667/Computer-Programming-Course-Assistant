import React, { useState } from 'react'
import { useAuth } from '../authentication/Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Profile = () => {
  const auth = useAuth()
  const [jobs, setJobs] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleClick = () => {
    auth.logout()
    navigate('/login')
  }

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://my-jobs-api.cyclic.app/api/v1/jobs', {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      console.log(response.data);
      setJobs(response.data.jobs)
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error)
    }
  };
  return (
    <div className=''>
      Wellcome {auth.user.name} <br />
      Access Token: {auth.token} <br />
      {jobs && <p className="text-red-500 mt-2">Jobs: {jobs}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button onClick={fetchJobs} className='border p-2 mt-4 bg-green-500 text-white'>Fetch Jobs</button>{" "}
      <button onClick={handleClick} className='border p-2 mt-4 bg-red-500 text-white'>Logout</button>
    </div>
  )
}
