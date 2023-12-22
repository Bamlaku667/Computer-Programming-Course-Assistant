import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import Home from './components/Home';
import RegistrationForm from './components/RegistrationForm';
import { Login } from './components/Login';
import { RequireAuth } from './components/RequireAuth';
import { Profile } from './components/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google'

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
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
