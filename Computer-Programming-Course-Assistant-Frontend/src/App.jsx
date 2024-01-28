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
            <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path='/myCourses' element={<RequireAuth><Courses /></RequireAuth>} />
            <Route path='/myCourses/:_id' element={<RequireAuth><CourseDetails /></RequireAuth>} />
            <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>}/>
            <Route path="*" element={<NoMatch />} />
          </Routes>
          {/* <Footer/> */}
        </>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
