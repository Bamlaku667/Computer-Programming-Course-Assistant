import React, { useEffect, useState } from "react";
import MainLayout from "../components/dashboard/common/MainLayout";
import { useAuth } from "../hooks/useAuthContex";
import axios from "axios";
import CourseCard from '../components/CourseCard'

const MyCourses = () => {
  const {user} = useAuth();
  const [tabs, setTabs] = useState([
    {
      id: 1,
      label: "Course In Progress",
      courses: []
    },
    {
      id: 2,
      label: "Completed Courses",
      courses: []
    },
    {
      id: 3,
      label: "Recently Watched",
      courses: []
    },
  ])
  const [activeTab, setActiveTab] = useState(1);
  const [error, setError] = useState('')

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        if (user.token) {
          const response = await axios.get('https://courseassistant.vercel.app/api/v1/student/courses', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          const inProgressCourses = response.data;
          setTabs(prevTabs => [
            {
              ...prevTabs[0],
              courses: inProgressCourses,
            },
            ...prevTabs.slice(1)
          ]);
        }
      } catch (error) {
        setError(error)
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []); 

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-white to-[#66C5DB]">
          <h1 className="p-12 text-4xl">Ysihak's Courses</h1>
          <div className="px-8 text-gray-700">
            <div className="flex gap-6 px-6 text-gray-700 text-md">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={` hover:text-blue-500 p-2 cursor-pointer ${
                    tab.id === activeTab
                      ? "border-b-4 border-blue-500"
                      : "border-b-red-200"
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="m-10">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${tab.id === activeTab ? "" : "hidden"} grid grid-cols-3`}>
              {tab.courses.length > 0 ? (tab.courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))):(`No ${tab.label} yet!!!`)}
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyCourses;
