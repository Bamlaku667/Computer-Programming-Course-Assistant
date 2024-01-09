import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuthContex";

export const Profile = () => {
  const { user, dispatch } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch({type: 'LOGOUT'})
    navigate("/login");
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://my-jobs-api.cyclic.app/api/v1/jobs",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };
  return (
    <div className="">
      Wellcome {user.email} <br />
      Access Token: {user.token} <br />
      {jobs && <p className="text-red-500 mt-2">Jobs: {jobs}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={fetchJobs}
        className="border p-2 mt-4 bg-green-500 text-white"
      >
        Fetch Jobs
      </button>{" "}
      <button
        onClick={handleClick}
        className="border p-2 mt-4 bg-red-500 text-white"
      >
        Logout
      </button>
    </div>
  );
};
