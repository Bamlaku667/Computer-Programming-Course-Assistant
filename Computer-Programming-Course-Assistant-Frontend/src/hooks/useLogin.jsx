import { useState } from "react";
import { useAuth } from "../hooks/useAuthContex";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const useLogin = () => {
  const [error, setError] = useState("");
  const { dispatch, user } = useAuth();
  const location = useLocation();
  const redirectPath = "/dashboard";
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://courseassistant.vercel.app/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data);
      // auth.login(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
      navigate(redirectPath, { replace: true });
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
export default useLogin;
