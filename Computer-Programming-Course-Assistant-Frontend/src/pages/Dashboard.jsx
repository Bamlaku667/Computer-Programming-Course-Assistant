import React, { useEffect, useState } from 'react';
import MiniCard from '../components/dashboard/MiniCard';
import MainLayout from '../components/dashboard/common/MainLayout'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthContex';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const Dashboard = () => {
  const {user} = useAuth();
  const [noOfCompletedCourses, setNoOfCompletedCourses] = useState(0);
  const [noOfInProgressCourses, setNoOfInProgressCourses] = useState(0);
  const [name, setName] = useState(0)
  const [error, setError] = useState('')
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user.token) {
          const response = await axios.get('https://courseassistant.vercel.app/api/v1/student/profile', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          setNoOfCompletedCourses(response.data.completedCourses.length);
          setNoOfInProgressCourses(response.data.inProgressCourses.length)
          setName(response.data.firstName)
        }
      } catch (error) {
        setError(error)
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const navLinkStyles = ({ isActive }) => {
    return {
      borderBottom: isActive ? "#66C5DB" : "gray",
    };
  };

  return (
    <div>
      <Navbar/>
      <MainLayout>
      <div className="container mx-auto">
        <div className='bg-gradient-to-r from-white to-[#66C5DB]'>
          <h1 className='p-12 text-4xl'>{`${name ? name : 'Student'}'s`} Dashboard - let's jump back in.</h1>
          <div className='px-8 text-gray-700'>
            <NavLink to={''} style={navLinkStyles}>
              <div className="text-2xl font-bold border-b-2 border-[#66C5DB]">Overview</div>
            </NavLink>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <MiniCard
            title="Completed Courses"
            value={noOfCompletedCourses}
            color="green"
          />
          <MiniCard
            title="Courses in Progress"
            value={noOfInProgressCourses}
            color="blue"
          />
          <MiniCard
            title="Other Attribute"
            value={0}
            color="orange"
          />
        </div>
      </div>
    </MainLayout>
    <Footer/>
    </div>
  );
};

export default Dashboard;
