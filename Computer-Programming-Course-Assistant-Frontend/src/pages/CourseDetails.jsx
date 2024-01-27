import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { images } from '../constants';
import { AiFillEye } from 'react-icons/ai';

const courseData = [
    {
      title: 'Web Development Fundamentals',
      instructor: 'John Doe',
      views: 2500,
      level: 'Beginner',
      rating: 4.2,
      modules: [
        {
          title: 'HTML Basics',
          lessons: [
            { title: 'Introduction to HTML', imageUrl: images.jsImage },
            { title: 'HTML Elements and Tags', imageUrl: 'https://example.com/html2.jpg' },
            { title: 'Structuring HTML Documents', imageUrl: 'https://example.com/html3.jpg' },
          ],
        },
        {
          title: 'CSS Styling',
          lessons: [
            { title: 'Introduction to CSS', imageUrl: 'https://example.com/css1.jpg' },
            { title: 'CSS Selectors and Properties', imageUrl: 'https://example.com/css2.jpg' },
            { title: 'Styling Layouts with CSS', imageUrl: 'https://example.com/css3.jpg' },
          ],
        },
        {
          title: 'JavaScript Basics',
          lessons: [
            { title: 'Introduction to JavaScript', imageUrl: 'https://example.com/js1.jpg' },
            { title: 'JavaScript Variables and Data Types', imageUrl: 'https://example.com/js2.jpg' },
            { title: 'Control Flow and Functions in JavaScript', imageUrl: 'https://example.com/js3.jpg' },
          ],
        },
        {
          title: 'Responsive Web Design',
          lessons: [
            { title: 'Introduction to Responsive Design', imageUrl: 'https://example.com/responsive1.jpg' },
            { title: 'Media Queries and Flexbox', imageUrl: 'https://example.com/responsive2.jpg' },
            { title: 'Building a Responsive Website', imageUrl: 'https://example.com/responsive3.jpg' },
          ],
        },
        {
          title: 'Introduction to Frontend Frameworks',
          lessons: [
            { title: 'Overview of Frontend Frameworks', imageUrl: 'https://example.com/frameworks1.jpg' },
            { title: 'React.js Fundamentals', imageUrl: 'https://example.com/frameworks2.jpg' },
            { title: 'Vue.js Basics', imageUrl: 'https://example.com/frameworks3.jpg' },
          ],
        },
      ],
    },
  ];

const displayModule = ({ item, handleLessonClick }) => {
  const [moduleClicked, setModuleClicked] = useState(false);

  return (
    <div className='w-60'>
      <div className='flex justify-between items-center border-t p-4' key={item.title}>
        <h1 className=''>{item.title}</h1>
        <button onClick={() => setModuleClicked(!moduleClicked)}>
          {!moduleClicked ? (
            <IoIosArrowForward />
          ) : (
            <IoIosArrowDown />
          )}
        </button>
      </div>
      {moduleClicked && (
        item.lessons.map((lesson, index) => (
          <button
            key={index}
            className='border-t p-4 cursor-pointer w-60'
            onClick={() => handleLessonClick(lesson.imageUrl)}
          >
            {lesson.title}
          </button>
        ))
      )}
    </div>
  );
};

export const CourseDetails = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonClick = (imageUrl) => {
    setSelectedLesson(imageUrl);
  };

  return (
    <div className=''>
        <div className='bg-[#27323d] text-white p-8 flex gap-5'>
            <div className=''>
                <h1 className='font-bold text-xl p-4 w-60'>Course Content</h1>
                <div className='w-60 max-h-[450px] overflow-y-auto hide-scrollbar'>
                    {courseData.map((course) =>
                    course.modules.map((item) => (
                        displayModule({item, handleLessonClick})
                    ))
                    )}
                </div>
            </div>
            {selectedLesson && (
                <div className='w-[1000px] flex flex-col gap-2 mt-4'>
                    <img src={selectedLesson} alt='Selected Lesson' className='bg-black w-full h-[450px] px-12' />
                    <h1 className='font-bold ml-10 text-2xl'>{courseData[0].title}</h1>
                </div>
            )}
        </div>
        <div className='grid grid-cols-3 gap-10 mt-10 ml-10 mr-5'>
            <div className='col-span-2'>
                <div className='flex gap-6 px-6 py-4 bg-gray-200 rounded-2xl text-gray-700 text-base'>
                    <button className='px-4 py-2 hover:text-blue-500 focus:bg-white focus:rounded-lg focus:text-blue-500'>About Course</button>
                    <button className='px-4 py-2 hover:text-blue-500 focus:bg-white focus:rounded-lg focus:text-blue-500'>Resourses</button>
                    <button className='px-4 py-2 hover:text-blue-500 focus:bg-white focus:rounded-lg focus:text-blue-500'>Descussion</button>
                    <button className='px-4 py-2 hover:text-blue-500 focus:bg-white focus:rounded-lg focus:text-blue-500'>Projects</button>
                    <button className='px-4 py-2 hover:text-blue-500 focus:bg-white focus:rounded-lg focus:text-blue-500'>Reviews</button>
                </div>
            </div>
            <div className='flex gap-20'>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'><AiFillEye className='text-blue-500 text-4xl'/><span>{courseData[0].views}</span></div>
                    <h2>Course view</h2>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Level</h2>
                    <p>{courseData[0].level}</p>
                </div>
            </div>
        </div>
    </div>
  );
};
