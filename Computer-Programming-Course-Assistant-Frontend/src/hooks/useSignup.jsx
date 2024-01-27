import { useState } from "react";
import axios from "axios";
import { url } from "../constants";
import { useAuth } from "./useAuthContex";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();

  const signup = async (userName, email, password) => {
    setError(null);
    try {
      const response = await axios.post(`${url}/auth/register`, {
        userName,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
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
