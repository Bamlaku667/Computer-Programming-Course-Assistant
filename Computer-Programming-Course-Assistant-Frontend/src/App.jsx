import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import RegistrationForm from "./pages/Registration";
import { RequireAuth } from "./authentication/RequireAuth";
import { Profile } from "./pages/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NoMatch } from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import MyCourses from "./pages/MyCourses";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { StudentLogin } from "./pages/StudentLogin";
import { CourseDetails } from "./pages/CourseDetails";
import { useAuth } from "./hooks/useAuthContex";
import InstructorDashboard from "./pages/InstructorDashboard";
import { Courses } from "./pages/Courses";

import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const clientId = "138178679163-i2g2io24rchh1tsafcapp76viof1d5t8.apps.googleusercontent.com";
  const { user } = useAuth();
  const [userData, setUserData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user.token && user.role === 'student') {
          const response = await axios.get('https://courseassistant.vercel.app/api/v1/student/profile', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          setUserData(response.data)
          console.log(response.data)
        } else if (user.token && user.role === 'instructor') {
          const response = await axios.get('https://courseassistant.vercel.app/api/v1/instructor/profile', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          setUserData(response.data)
          console.log(response.data)
        }
      } catch (error) {
        setError(error)
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
        <>
          <Navbar image={userData.image} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/register' element={<RegistrationForm />} />
            <Route path='/login' element={<StudentLogin />} />
            <Route path='/dashboard' element={ user ? <Dashboard userData={userData} />: <StudentLogin/>} />
            <Route path='/myCourses' element={ user ? <MyCourses /> : <StudentLogin/>} />
            <Route path='/myCourses/:_id' element={ user ? <CourseDetails /> : <StudentLogin/>} />
            <Route path='/profile' element={ user ? <Profile />: <StudentLogin/>}/>
            <Route path='/instructor' element={ user ? <InstructorDashboard userData={userData}/> : <StudentLogin/>}/>
            <Route path="*" element={<NoMatch />} />
          </Routes>
          {/* <Footer/> */}
        </>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
