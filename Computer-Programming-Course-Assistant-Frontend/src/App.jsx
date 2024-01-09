import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import RegistrationForm from './pages/Registration';
import { Login } from './pages/Login';
import { RequireAuth } from './authentication/RequireAuth';
import { Profile } from './pages/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { NoMatch } from './pages/NoMatch';
import MainLayout from './components/dashboard/common/MainLayout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/MyCourses';
import { useAuth } from './hooks/useAuthContex';

function App() {
  const clientId = '138178679163-i2g2io24rchh1tsafcapp76viof1d5t8.apps.googleusercontent.com'
  const {user} = useAuth();

  return (
    <div className='App'>
      <GoogleOAuthProvider clientId={clientId}>
        <>
          <Routes>

            <Route path='/' element={ <Home/>} /> 
            <Route path='/dashboard' element={<MainLayout><Dashboard /></MainLayout>} /> 
            <Route path='/register' element={<RegistrationForm/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>} />
            
            <Route path='/myCourses' element={<MainLayout><Courses /></MainLayout>} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
