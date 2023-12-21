import React, { useState } from "react";
import register from "../assets/register.svg";
import { FaGoogle, FaFacebook, FaEyeSlash, FaEye } from "react-icons/fa";

export default function RegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();

    // Add your registration logic here
    console.log("Form submitted:", { fullName, email, password });
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Add your Google sign-up logic here
  };

  const responseFacebook = (response) => {
    console.log(response);
    // Add your Facebook sign-up logic here
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
              <button className="flex items-center justify-center text-gray-500 px-4 py-2 border rounded-full shadow-sm text-sm md:text-md">
                <FaGoogle className="mr-2" style={{ color: "green" }} /> Sign Up
                with Google
              </button>
              {/* Facebook Sign Up Button */}
              <button className="flex items-center justify-center text-gray-600 px-4 py-2 border rounded-full shadow-sm text-sm md:text-md">
                <FaFacebook className="mr-2" style={{ color: "blue" }} /> Sign
                Up with Facebook
              </button>
            </div>
            {/* divider */}
            <div className="flex mt-8 justify-center text-gray-500">----or sign up with email----</div>
            <div className="mt-8 mb-4">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
