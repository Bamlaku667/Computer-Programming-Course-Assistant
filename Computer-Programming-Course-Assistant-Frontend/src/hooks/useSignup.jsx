import { useState } from "react";
import axios from "axios";
import { url } from "../constants";
import { useAuth } from "./useAuthContex";
import {  useNavigate } from "react-router-dom";

const useSignUp = () => {
  const [error, setError] = useState(null);
  // const { dispatch } = useAuth();
  const redirectPath = "/login";
  const navigate = useNavigate();

  const signup = async (userName, email, password) => {
    setError(null);
    try {
      const response = await axios.post(`${url}/auth/register`, {
        userName,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      // localStorage.setItem("user", JSON.stringify(response.data));
      // dispatch({ type: "LOGIN", payload: response.data });
      navigate(redirectPath, { replace: true });

    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || "Unexpected error"
      );
      setError("Registration failed. Please try again.");
    }
  };

  return { signup, error };
};

export default useSignUp;
