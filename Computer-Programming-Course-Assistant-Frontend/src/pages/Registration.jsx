import React, { useEffect, useState } from "react";

import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { images } from "../constants";

export default function RegistrationForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  useEffect(() => {
    setError("");
  }, [userName, email, password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const registerdUser = { userName, email, password };
    console.log("Form submitted:", registerdUser);
    try {
      const response = await axios.post(
        "https://courseassistant.vercel.app/api/v1/auth/register",
        {
          userName,
          email,
          password,
        }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || "Unexpected error"
      );
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-primary h-screen p-8 border rounded-3xl">
      <div className="flex flex-col lg:flex-row bg-white border rounded-3xl">
        <div className="flex-1 px-8 py-4">
          <img
            src={images.RegisterImage}
            alt="Registration "
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 p-8">
          <h2 className="flex justify-center sm:justify-start text-2xl font-bold mb-8">
            Create Account
          </h2>
          <form onSubmit={onSubmit} className="max-w-md">
            <div className="flex flex-col gap-5 md:flex-row mt-4 mb-8 justify-between">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            </div>
            <div className="flex mt-8 justify-center text-gray-500">
              ----or sign up with email----
            </div>
            <div className="mt-8 mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
              className="bg-primary text-white px-4 py-2 rounded w-full"
            >
              Create Account
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
          <div className="mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-blue-600 hover:text-lg">Sign in</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
