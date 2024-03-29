import { useState } from "react";
import { useAuth } from "./useAuthContex";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const useStudentLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch, user } = useAuth();
  const navigate = useNavigate();

  const login = async (email, password, url) => {
    setError(null);
    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      const userRole = response.data.role;

      console.log("Login successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
      if (userRole === "Instructor") {
        navigate("/instructor-dashboard", { replace: true });
      } else {
        navigate("/student-dashboard", { replace: true });
      }

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
