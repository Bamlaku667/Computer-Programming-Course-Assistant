import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { images } from "../constants";
import MainLayout from "../components/dashboard/common/MainLayout";
import { NavLink } from "react-router-dom";

const tabs = [
  {
    id: 1,
    label: "Course In Progress",
    content: "Course In Progress",
  },
  {
    id: 2,
    label: "Completed Courses",
    content: "Completed Courses",
  },
  {
    id: 3,
    label: "Recently Watched",
    content: "Recently Watched",
  },
];

const Courses = () => {
  // State to store the list of courses
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  // useEffect to fetch courses from the backend when the component mounts
  useEffect(() => {
    // Replace this with actual API calls to fetch courses
    // For simplicity, I'll use mock data
    const courses = [
      {
        _id: "1",
        title: "Web Development Fundamentals",
        instructor: "John Doe",
        description: "Learn the basics of HTML,CSS and Javascript",
        moduleNo: 8,
        enrolledStudents: 50,
        image: images.jsImage,
        views: 2500,
        level: "Beginner",
        rating: 4.2,
        modules: [
          {
            title: "HTML Basics",
            lessons: [
              { title: "Introduction to HTML", imageUrl: images.jsImage },
              { title: "HTML Elements and Tags", imageUrl: images.jsImage },
              { title: "Structuring HTML Documents", imageUrl: images.jsImage },
            ],
          },
          {
            title: "CSS Styling",
            lessons: [
              { title: "Introduction to CSS", imageUrl: images.jsImage },
              {
                title: "CSS Selectors and Properties",
                imageUrl: images.jsImage,
              },
              { title: "Styling Layouts with CSS", imageUrl: images.jsImage },
            ],
          },
          {
            title: "JavaScript Basics",
            lessons: [
              { title: "Introduction to JavaScript", imageUrl: images.jsImage },
              {
                title: "JavaScript Variables and Data Types",
                imageUrl: images.jsImage,
              },
              {
                title: "Control Flow and Functions in JavaScript",
                imageUrl: images.jsImage,
              },
            ],
          },
          {
            title: "Responsive Web Design",
            lessons: [
              {
                title: "Introduction to Responsive Design",
                imageUrl: images.jsImage,
              },
              { title: "Media Queries and Flexbox", imageUrl: images.jsImage },
              {
                title: "Building a Responsive Website",
                imageUrl: images.jsImage,
              },
            ],
          },
          {
            title: "Introduction to Frontend Frameworks",
            lessons: [
              {
                title: "Overview of Frontend Frameworks",
                imageUrl: images.jsImage,
              },
              { title: "React.js Fundamentals", imageUrl: images.jsImage },
              { title: "Vue.js Basics", imageUrl: images.jsImage },
            ],
          },
        ],
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
              className={`${tab.id === activeTab ? "" : "hidden"}`}>
              {/* {tab.content.map((content) => (
                // <CourseCard key={content._id} course={content} />

              
              ))} */}
              {tab.content}
            </div>
          ))}
        </div>
        {/* <div ">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div> */}
      </div>
    </MainLayout>
  );
};

export default Courses;
