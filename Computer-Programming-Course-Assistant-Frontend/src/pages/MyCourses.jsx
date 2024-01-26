import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { images } from '../constants';
import MainLayout from '../components/dashboard/common/MainLayout';
import { NavLink } from 'react-router-dom';

const Courses = () => {
  // State to store the list of courses
  const [courses, setCourses] = useState([]);

  // useEffect to fetch courses from the backend when the component mounts
  useEffect(() => {
    // Replace this with actual API calls to fetch courses
    // For simplicity, I'll use mock data
    const courses = [
      {
        _id: '1',
        title: 'HTML',
        description: 'Learn the basics of HTML,CSS and Javascript',
        modules: 10,
        enrolledStudents: 50,
        image: images.jsImage,
        rating: {
          value: 4.8,
          reviews: 150
        }
      },
      {
        _id: '2',
        title: 'Python',
        description: 'Master Python development',
        modules: 8,
        enrolledStudents: 30,
        image: images.jsImage,
        rating: {
          value: 4.8,
          reviews: 150
        }
      },
      {
        _id: '3',
        title: 'React',
        description: 'Learn the basics of React.js',
        modules: 10,
        enrolledStudents: 50,
        image: images.jsImage,
        rating: {
          value: 4.8,
          reviews: 150
        }
      },
      {
        _id: '4',
        title: 'Node.js',
        description: 'Master Node.js development',
        modules: 8,
        enrolledStudents: 30,
        image: images.jsImage,
        rating: {
          value: 4.8,
          reviews: 150
        }
      },
      {
        _id: '5',
        title: 'AngularJS',
        description: 'Learn the basics of AngularJS',
        modules: 10,
        enrolledStudents: 50,
        image: images.jsImage,
        rating: {
          value: 4.8,
          reviews: 150
        }
      },
    ];

    setCourses(courses);
  }, []);

  const navLinkStyles = ({ isActive }) => {
    return {
      borderBottom: isActive ? "#66C5DB" : "gray",
    };
  };

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className='bg-gradient-to-r from-white to-[#66C5DB]'>
          <h1 className='p-12 text-4xl'>Ysihak's Courses</h1>
          <div className='px-8 text-gray-700'>
            <NavLink to={''} style={navLinkStyles}>
              <button className="text-2xl font-bold border-b-2 border-[#66C5DB]">Recently Watched</button>
            </NavLink>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;
