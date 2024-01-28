import React, { useEffect, useState } from 'react'
import { images } from '../constants'
import CourseCard from '../components/CourseCard';

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const courses = [
      {
        _id: '1',
        title: 'Web Development Fundamentals',
        instructor: 'John Doe',
        description: 'Learn the basics of HTML,CSS and Javascript',
        moduleNo: 8,
        enrolledStudents: 50,
        image: images.jsImage,
        views: 2500,
        level: 'Beginner',
        rating: 4.2,
        modules: [
          {
            title: 'HTML Basics',
            lessons: [
              { title: 'Introduction to HTML', imageUrl: images.jsImage },
              { title: 'HTML Elements and Tags', imageUrl: images.jsImage },
              { title: 'Structuring HTML Documents', imageUrl: images.jsImage },
            ],
          },
          {
            title: 'CSS Styling',
            lessons: [
              { title: 'Introduction to CSS', imageUrl: images.jsImage },
              { title: 'CSS Selectors and Properties', imageUrl: images.jsImage },
              { title: 'Styling Layouts with CSS', imageUrl: images.jsImage },
            ],
          },
          {
            title: 'JavaScript Basics',
            lessons: [
              { title: 'Introduction to JavaScript', imageUrl: images.jsImage },
              { title: 'JavaScript Variables and Data Types', imageUrl: images.jsImage },
              { title: 'Control Flow and Functions in JavaScript', imageUrl: images.jsImage },
            ],
          },
          {
            title: 'Responsive Web Design',
            lessons: [
              { title: 'Introduction to Responsive Design', imageUrl: images.jsImage },
              { title: 'Media Queries and Flexbox', imageUrl: images.jsImage },
              { title: 'Building a Responsive Website', imageUrl: images.jsImage },
            ],
          },
          {
            title: 'Introduction to Frontend Frameworks',
            lessons: [
              { title: 'Overview of Frontend Frameworks', imageUrl: images.jsImage },
              { title: 'React.js Fundamentals', imageUrl: images.jsImage },
              { title: 'Vue.js Basics', imageUrl: images.jsImage },
            ],
          },
        ],
      },
    ];

    setCourses(courses);
  }, []);
  return (
    <div className=''>
        <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${images.jsImage})` }}>
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">Biginner to Advance Course</h1>
            </div>
        </div>
        <div className='m-10'>
            <h1 className='text-2xl mb-10'>All Courses</h1>
            {courses.map(course => (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>

    </div>
  )
}
