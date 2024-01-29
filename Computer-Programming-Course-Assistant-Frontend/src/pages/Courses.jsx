import React, { useEffect, useState } from "react";
import { images, url } from "../constants";
import CourseCard from "../components/CourseCard";
import axios from "axios";
import { useCoursesContext } from "../hooks/useCoursesContext";
import { useAuth } from "../hooks/useAuthContex";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContex";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        console.log('courses',response.data);
        dispatch({ type: "SET_COURSES", payload: response.data });
      } catch (error) {
        console.error("error in fetching", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className=" mt-4 mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses && courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
    <Footer/>
    </div>
  );

};
