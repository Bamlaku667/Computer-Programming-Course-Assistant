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
import { StudentLogin } from "./pages/StudentLogin";
import { CourseDetails } from "./pages/CourseDetails";
import { useAuth } from "./hooks/useAuthContex";
import { Courses } from "./pages/Courses";
import InstructorDashboard from "./components/Instructor/Instructor";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const clientId =
    "138178679163-i2g2io24rchh1tsafcapp76viof1d5t8.apps.googleusercontent.com";

  const { user } = useAuth();

  console.log(user);
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/register' element={<RegistrationForm />} />
            <Route path='/login' element={<StudentLogin />} />
            <Route path='/dashboard' element={ user ? <Dashboard />: <StudentLogin/>} />
            <Route path='/myCourses' element={ user ? <MyCourses /> : <StudentLogin/>} />
            <Route path='/myCourses/:_id' element={ user ? <CourseDetails /> : <StudentLogin/>} />
            <Route path='/profile' element={ user ? <Profile />: <StudentLogin/>}/>
            <Route path='/instructor' element={ user ? <InstructorDashboard/> : <StudentLogin/>}/>
            <Route path='/admin-dashboard' element={user ? <AdminDashboard/> : <StudentLogin/>}/>
            <Route path="*" element={<NoMatch />} />
          </Routes>
          {/* <Footer/> */}
        </>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
