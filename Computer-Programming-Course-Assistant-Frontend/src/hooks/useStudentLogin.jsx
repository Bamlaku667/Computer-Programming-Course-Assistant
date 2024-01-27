import { useState } from "react";
import { useAuth } from "./useAuthContex";
import {  useNavigate } from "react-router-dom";

import axios from "axios";

const useStudentLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch, user } = useAuth();
  const redirectPath = "/dashboard";
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null); 
    try {
      const response = await axios.post(
        "https://courseassistant.vercel.app/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
      navigate(redirectPath, { replace: true });
      // console.log(user); 
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data || "Unexpected error"
      );
      setError("Login failed. Please try again.");
    }
  };

  return { login, error };
};
export default useStudentLogin;
