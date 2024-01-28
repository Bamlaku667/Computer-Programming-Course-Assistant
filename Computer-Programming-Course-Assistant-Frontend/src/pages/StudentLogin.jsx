import React, { useState } from "react";
import useStudentLogin from "../hooks/useStudentLogin";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { images } from "../constants";

export const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useStudentLogin();
  const [showPassword, setShowPassword] = useState(true);


  const handleClick = async (e) => {
    e.preventDefault();
    await login(email, password);
    console.log("Student Form submitted:", { email, password });
  };

  return (
    <div className="bg-primary h-screen p-8 border rounded-3xl">
      <div className="flex flex-col lg:flex-row bg-white border rounded-3xl">
        <div className="flex-1 px-8 py-4">
          {/* Your Logo or Image Here */}
          <img
            src={images.RegisterImage}
            alt="Registration "
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 p-8">
          <h2 className="flex justify-center sm:justify-start text-2xl font-bold mb-8">
           
              Student Login
          
          </h2>
          <form onSubmit={handleClick} className="max-w-md">
            <div className="flex mt-8 justify-center text-gray-500">
              ---- Login with your credentials ----
            </div>
            <div className="mt-8 mb-4">
              <input
                type="text"
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
                type={showPassword ? "password" : "text"}
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
              className="bg-primary text-white hover:text-lg px-4 py-2 rounded w-full"
            >
              Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
          <div className="mt-8">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/registration">
                <span className="text-blue-600 hover:text-lg">Register here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
