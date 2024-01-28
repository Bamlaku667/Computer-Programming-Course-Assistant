import React, { useEffect, useState } from "react";
import { images, url } from "../constants";
// import CourseCard from "../components/CourseCard";
import axios from "axios";
import { useCoursesContext } from "../hooks/useCoursesContext";

export const Courses = () => {
  // const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch, courses } = useCoursesContext();

  console.log("courses page");
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${url}/courses`);
        console.log(response.data);
        dispatch({ type: "SET_COURSES", payload: response.data });
      } catch (error) {
        console.error("error in fetching", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className=" mt-4 mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses && courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );

};

const CourseCard = ({ course }) => {
  const { title, description, images, _id } = course;

  const handleEnroll = () => {
    // Add your enrollment logic here
    console.log(`Enrolling to course: ${title}`);
  };

  return (
    <div className="bg-white p-6 mb-4 rounded-md shadow-md">
      <img
        src={images.length > 0 ? `${url}/${images[0]}` : images.jsImage}
        alt={title}
        className="w-full h-40 object-cover mb-4 rounded-md"
      />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <button
        onClick={handleEnroll}
        className="bg-primary text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
      >
        Get Course
      </button>
    </div>
  );
};