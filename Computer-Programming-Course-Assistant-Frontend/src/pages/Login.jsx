import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useLogin();

  const handleClick = async (e) => {
    e.preventDefault();
    await login(email, password);
    console.log("Form submitted:", { email, password });
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-primary text-white rounded-md">
      <label className="block mb-2">Email:</label>
      <input
        type="text"
        className="w-full p-2 mb-4 bg-soft text-dark-light rounded-md"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="block mb-2">Password:</label>
      <input
        type="password"
        className="w-full p-2 mb-4 bg-soft text-dark-light rounded-md"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        className="bg-dark-soft hover:text-white text-primary py-2 px-4 rounded-md"
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  );
};
