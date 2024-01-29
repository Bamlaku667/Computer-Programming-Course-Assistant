import React, { useEffect, useState } from 'react'
import MainLayout from '../components/dashboard/common/MainLayout'
import { useAuth } from '../hooks/useAuthContex';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const InstructorDashboard = () => {
    const {user} = useAuth();
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [courses, setCourses] = useState([])

    console.log('instructor', user)

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            if (user.token) {
              const response = await axios.get('https://courseassistant.vercel.app/api/v1/instructor/profile', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              });
              setName(response.data.firstName)
            }
          } catch (error) {
            setError(error)
            console.error('Error fetching data:', error);
          }
        };
    
        fetchUserData();
      }, []);

      useEffect(() => {
        const fetchCourses = async () => {
          try {
            if (user.token) {
              const response = await axios.get('https://courseassistant.vercel.app/api/v1/instructor/courses', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              });
              setCourses(response.data)
              console.log('instructor Courses',response.data)
            }
          } catch (error) {
            setError(error)
            console.error('Error fetching data:', error);
          }
        };
    
        fetchCourses();
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
        <div className='container mx-auto'>
            <div className='bg-gradient-to-r from-white to-[#66C5DB]'>
                <h1 className='p-12 text-4xl'>{`${name ? name : 'Instructor'}'s`} Dashboard - let's jump back in.</h1>
                <div className='px-8 text-gray-700'>
                    <NavLink to={''} style={navLinkStyles}>
                        <div className="text-2xl font-bold border-b-2 border-[#66C5DB]">Courses</div>
                    </NavLink>
                </div>
            </div>
            <div className='m-10 grid grid-cols-3 gap-5'>
                {courses && courses.map(course => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
        </div>
    </MainLayout>
    <Footer/>
    </div>
  )
}
