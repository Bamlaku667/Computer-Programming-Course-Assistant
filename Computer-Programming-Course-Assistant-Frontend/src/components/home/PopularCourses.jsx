import React from 'react'
import CourseSlider from './CourseSlider';
import { images } from '../../constants';

export default function PopularCourses() {
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
    ];
  return (
    <div className='flex gap-10 h-screen bg-[#E7F6F9] rounded-tl-[50px] items-center'>
        <p className='pl-28 text-3xl font-bold -mt-24'>Most<br /><span className='text-primary'>Popular<br />Courses</span></p>
        <div className='w-[74vw]'>
          <CourseSlider courses={courses}/>
        </div>
    </div>
  )
}
