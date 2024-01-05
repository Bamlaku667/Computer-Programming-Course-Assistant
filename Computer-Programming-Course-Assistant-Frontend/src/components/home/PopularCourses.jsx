import React from 'react'
import CourseSlider from './CourseSlider';

export default function PopularCourses() {
    const courses = [
        {
          id: 1,
          name: 'HTML',
          image: 'https://via.placeholder.com/300',
          description: 'Learn the basics of web development with HTML, CSS, and JavaScript.',
          rating: {
            value: 4.5,
            reviews: 120
          }
        },
        {
          id: 2,
          name: 'Python',
          image: 'https://via.placeholder.com/300',
          description: 'Dive into Python programming language and build real-world applications.',
          rating: {
            value: 4.2,
            reviews: 90
          }
        },
        {
            id: 3,
            name: 'React.js',
            image: 'https://via.placeholder.com/300',
            description: 'Master the fundamentals of React.js and build modern, interactive web applications.',
            rating: {
              value: 4.8,
              reviews: 150
            }
          },
          {
            id: 4,
            name: 'Data Science',
            image: 'https://via.placeholder.com/300',
            description: 'Explore the world of data science using Python and its powerful libraries.',
            rating: {
              value: 4.7,
              reviews: 110
            }
          },
      ];
  return (
    <div className='flex gap-10 h-screen bg-[#E7F6F9] rounded-tl-[50px] items-center'>
        <p className='pl-28 text-3xl font-bold -mt-24'>Most<br /><span className='text-[#66C5DB]'>Popular<br />Courses</span></p>
        <div className='w-[74vw]'>
          <CourseSlider courses={courses}/>
        </div>
    </div>
  )
}
