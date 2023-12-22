import React, { useEffect, useState } from "react";
import register from "../assets/register.svg";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
// import { GithubLoginButton } from 'react-github-login'

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const clientId = '138178679163-i2g2io24rchh1tsafcapp76viof1d5t8.apps.googleusercontent.com'
  useEffect(() => {
    setError('')
  }, [name, email, password])

  const onSubmit = async (e) => {
    e.preventDefault();
    const registerdUser = {name, email, password}
    console.log("Form submitted:", registerdUser);
    try {
      const response = await axios.post('https://my-jobs-api.cyclic.app/api/v1/auth/register', {
        name,
        email,
        password,
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error.response?.data || 'Unexpected error');
      setError('Registration failed. Please try again.');
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Add your Google sign-up logic here
  };

  const responseGithub = (response) => {
    console.log(response);
    // Add your github sign-up logic here
  };
  return (
    <div className="bg-[#2196F3] h-screen p-8 border rounded-3xl">
      <div className="flex flex-col lg:flex-row bg-white border rounded-3xl">
        {/* Image on the left */}
        <div className="flex-1 px-8 py-4">
          <img
            src={register}
            alt="Registration Image"
            className="w-full h-auto"
          />
        </div>

        {/* Form on the right */}
        <div className="flex-1 p-8">
          <h2 className="flex justify-center sm:justify-start text-2xl font-bold mb-8">Create Account</h2>
          <form onSubmit={onSubmit} className="max-w-md">
            <div className="flex flex-col gap-5 md:flex-row mt-4 mb-8 justify-between">
              {/* Google Sign Up Button */}
              <GoogleOAuthProvider
                clientId={clientId}
                onScriptLoadError={responseGoogle}
                onScriptLoadSuccess={responseGoogle}
              >
                <GoogleLogin className="flex items-center justify-center text-gray-500 px-4 py-2 border rounded-full shadow-sm text-sm md:text-md" onSuccess={responseGoogle} onError={responseGoogle}></GoogleLogin>
              </GoogleOAuthProvider>
              {/* Github Sign Up Button */}
              {/* <GithubLoginButton
                clientId="477927f422e46fdc23a5"
                onSuccess={responseGithub}
                onFailure={responseGithub}
              >
                Login with GitHub
              </GithubLoginButton> */}
            </div>
            {/* divider */}
            <div className="flex mt-8 justify-center text-gray-500">----or sign up with email----</div>
            <div className="mt-8 mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input mt-1 block w-full py-2 focus:outline-none border-0 border-b-2"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input mt-1 block w-full py-2 focus:outline-none border-0 border-b-2"
              />
            </div>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input mt-1 block w-full py-2 focus:outline-none border-0 border-b-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Create Account
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
          {/* Already have an account? Sign in section */}
          <div className="mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-blue-600 hover:text-lg">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
