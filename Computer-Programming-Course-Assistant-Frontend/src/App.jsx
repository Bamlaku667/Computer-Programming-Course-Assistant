import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import RegistrationForm from "./pages/Registration";
import { RequireAuth } from "./authentication/RequireAuth";
import { Profile } from "./pages/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NoMatch } from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/MyCourses";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { StudentLogin } from "./pages/StudentLogin";
import { CourseDetails } from "./pages/CourseDetails";
import { useAuth } from "./hooks/useAuthContex";
import InstructorDashboard from "./pages/InstructorDashboard";

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
            <Route path='/register' element={<RegistrationForm />} />
            <Route path='/login' element={<StudentLogin />} />
            <Route path='/dashboard' element={ user ? <Dashboard />: <StudentLogin/>} />
            <Route path='/myCourses' element={ user ? <Courses /> : <StudentLogin/>} />
            <Route path='/myCourses/:_id' element={ user ? <CourseDetails /> : <StudentLogin/>} />
            <Route path='/profile' element={ user ? <Profile />: <StudentLogin/>}/>
            <Route path='/instructor' element={ <InstructorDashboard/>}/>
            
            <Route path="*" element={<NoMatch />} />
          </Routes>
          {/* <Footer/> */}
        </>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
