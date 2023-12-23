import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authentication/Auth';
import Home from './pages/Home';
import RegistrationForm from './pages/Registration';
import { Login } from './pages/Login';
import { RequireAuth } from './authentication/RequireAuth';
import { Profile } from './pages/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { NoMatch } from './pages/NoMatch';

function App() {
  const clientId = '138178679163-i2g2io24rchh1tsafcapp76viof1d5t8.apps.googleusercontent.com'
  return (
    <div className='App'>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<RegistrationForm/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
