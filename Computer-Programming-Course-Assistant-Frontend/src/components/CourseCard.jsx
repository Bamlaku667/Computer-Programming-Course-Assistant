import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContex";
import axios from "axios";
import { images, url } from "../constants";
import { useEffect, useState } from "react";

export default function CourseCard ({ course }) {
  const { title, description, _id } = course;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([])

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
          setEnrolledCourses(inProgressCourses)
        }
      } catch (error) {
        setError(error)
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const enrolled = enrolledCourses.filter(item => item._id === _id)

  const handleEnroll = async () => {
    console.log(_id);
    if (!user) {
      navigate("/login");
    } else {
      try {
        const response = await axios.post(
          `${url}/student/courses/${_id}/enroll`,
          null, 
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("Enrollment successful:", response.data);
      } catch (error) {
        console.error(
          "Enrollment failed:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="bg-white p-6 mb-4 rounded-md shadow-md mr-5">
      <img
        src={images.jsImage}
        alt={title}
        className="w-full h-40 object-cover mb-4 rounded-md"
      />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <div className=""> 
      {enrolled.length === 0 ? (<button
        onClick={handleEnroll}
        className="bg-primary text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
      >
        Get Course
      </button>):(<div className="flex justify-center pt-2">
        <Link to={`/myCourses/${_id}`} className="p-1 border shadow-md rounded-md"> <img src={images.redirect} alt="redirect" /> </Link>
      </div>)}
      </div>
    </div>
  );
};