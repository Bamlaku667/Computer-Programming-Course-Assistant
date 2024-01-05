import React, { useEffect, useState } from 'react';
import CourseCard from '../components/dashboard/CourseCard';

const Courses = () => {
  // State to store the list of courses
  const [courses, setCourses] = useState([]);

  // useEffect to fetch courses from the backend when the component mounts
  useEffect(() => {
    // Replace this with actual API calls to fetch courses
    // For simplicity, I'll use mock data
    const mockCourses = [
      {
        _id: '1',
        title: 'Introduction to React',
        description: 'Learn the basics of React.js',
        modules: 10,
        enrolledStudents: 50,
        images: ['image1.jpg'],
      },
      {
        _id: '2',
        title: 'Node.js Fundamentals',
        description: 'Master Node.js development',
        modules: 8,
        enrolledStudents: 30,
        images: ['image3.jpg'],
      },
      // Add more courses as needed
    ];

    setCourses(mockCourses);
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
