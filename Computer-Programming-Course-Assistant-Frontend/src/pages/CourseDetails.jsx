import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { images } from '../constants';
import { AiFillEye } from 'react-icons/ai';
import { FaGlobe, FaGraduationCap, FaMapMarker, FaStar } from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';
import { useParams } from 'react-router-dom';

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
      level: 'Intermediate',
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

  const tabs = [
    {
      id: 1,
      label: 'About Course',
      content: 'Content for Tab 1',
    },
    {
      id: 2,
      label: 'Resourses',
      content: 'Content for Tab 2',
    },
    {
      id: 3,
      label: 'Descussion',
      content: 'Content for Tab 3',
    },
    {
      id: 4,
      label: 'Projects',
      content: 'Content for Tab 4',
    },
    {
      id: 5,
      label: 'Reviews',
      content: 'Content for Tab 5',
    },
  ];

  const instructor = {
      name: 'Ysihak Bazezew',
      image:'',
      Followers: 200,
      courses: 5,
      details:[
        {
          header: 'Headline',
          desc: 'Software Developer',
          icon: <MdTitle/>
        },
        {
          header: 'Education',
          desc: 'BBA',
          icon: <FaGraduationCap/>
        },
        {
          header: 'Languages',
          desc: ['English', 'Amharic'],
          icon: <FaGlobe/>
        },
        {
          header: 'Country',
          desc: 'Ethiopia',
          icon: <FaMapMarker/>
        },
      ]
    }

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
  const { _id } = useParams();
  const courseData = courses.filter((course) => course._id === _id)
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const handleLessonClick = (imageUrl) => {
    setSelectedLesson(imageUrl);
  };

  return (
    <div className=''>
        <div className='bg-[#27323d] text-white p-8 flex gap-5'>
            <div className=''>
                <h1 className='font-bold text-xl p-4 w-60'>Course Content</h1>
                <div className='w-60 h-[450px] overflow-y-auto hide-scrollbar'>
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
              <div className='flex flex-col gap-5'>
                <div className='flex gap-6 px-6 py-4 bg-gray-200 rounded-2xl text-gray-700 text-base'>
                  {tabs.map(tab => (
                    <div key={tab.id} className={`px-4 py-2 hover:text-blue-500 cursor-pointer ${tab.id === activeTab ? 'bg-white rounded-lg text-blue-500':''}`}
                      onClick={() => handleTabClick(tab.id)}>{tab.label}
                    </div>
                  ))}
                </div>
                {tabs.map(tab => (
                  <div key={tab.id} className={`${tab.id === activeTab ? '':'hidden'}`}>
                    {tab.content}
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex gap-10 items-center'>
                  <div className='flex flex-col gap-2'>
                      <div className='flex gap-2 items-center'><AiFillEye className='text-blue-500 text-4xl'/><span>{courseData[0].views}</span></div>
                      <h2>Course view</h2>
                  </div>
                  <div className='flex flex-col gap-2'>
                      <p>{courseData[0].level}</p>
                      <h2>Course Level</h2>
                  </div>
                  <div className='flex flex-col gap-2'>
                      <div className='flex gap-2 items-center'><FaStar className='text-yellow-500 text-4xl'/><span>{courseData[0].rating}</span></div>
                      <h2>Course Rating</h2>
                  </div>
              </div>
              <div className='flex flex-col border-t gap-5'>
                <h1 className='text-dark-light'>Instructor</h1>
                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mr-2 overflow-hidden">
                      {
                        !instructor.image ? (<img src={images.profilePlaceholder} className='w-20 h-20' alt="Profile" />)
                        : (<img src={instructor.image} className='w-20 h-20' alt="Profile" />)
                      }
                  </div>
                  <div className='text-base'>
                    <h2 className="font-bold">Ysihak Bazezew</h2>
                    <div className="flex items-center gap-5">
                      <p className="text-gray-500"><span className='text-[#66C5DB]'>200</span> followers</p>
                      <p className="text-gray-500"><span className='text-[#66C5DB]'>5</span> courses</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col text-base gap-2'>
                  {instructor.details && instructor.details.map(item => (
                    <div className='flex gap-2 items-center'>
                      <div className='text-[#66C5DB]'>{item.icon}</div>
                      <div className='flex gap-2'>
                        <h1 className='font-bold'>{item.header}</h1>
                        <p className='text-gray-500'>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex flex-col gap-2'>
                  <button type="submit" className="bg-[#66C5DB] text-white font-bold px-4 py-2 rounded w-full">
                    Follow
                  </button>
                  <button type="submit" className="bg-gray-200 text-gray-500 px-4 py-2 rounded w-full">
                    Report Course
                  </button>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
};
