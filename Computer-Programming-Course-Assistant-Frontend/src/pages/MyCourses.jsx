import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { images } from '../constants';

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
      // Add more courses as needed
    ];

    setCourses(courses);
  }, []);

  return (
    <div className="container mx-auto">
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
