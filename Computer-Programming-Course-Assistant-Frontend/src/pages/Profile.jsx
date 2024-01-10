import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuthContex";
import { images } from "../constants";

export const Profile = ({image}) => {
  const { user, dispatch } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch({type: 'LOGOUT'})
    navigate("/login");
  };

  return (
    <div className="container mx-auto bg-white px-4 py-8 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <div className="pb-4 border-b mb-4">
          <h1 className="text-2xl font-bold">Account</h1>
          <span className="text-base text-gray-400">Real time informations and activities of your properties.</span>
        </div>
        <button className="px-4 py-2 shadow-md rounded-md bg-blue-500 text-white">Save changes</button>
      </div>
      <form action="">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-2 overflow-hidden">
              {!image ? (
                <img
                  src={images.profilePlaceholder}
                  className="w-16 h-16"
                  alt="Profile"
                />
              ) :
              (<img src={image} className="w-16 h-16" alt="Profile" />)}
            </div>
            <div className="text-sm">
              <h1>Profile picture</h1>
              <span className="text-gray-400">JPG,JPEG under 15MB</span>
            </div>
          </div>
          <div className="flex gap-2 text-base">
            <button className="px-4 py-2 shadow-md rounded-md ">Upload new picture</button>
            <button className="px-4 py-2 shadow-md rounded-md bg-gray-100">Delete</button>
          </div>
        </div>
        <div className="pb-4 border-b mb-4">
          <h1 className="text-xl font-semibold mb-4">Full name</h1>
          <div className="flex item-center justify-between">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base text-gray-500">First name</label>
              <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base text-gray-500">Last name</label>
              <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md" />
            </div>
          </div>
        </div>
        <div className="pb-4 border-b mb-4">
          <div className="mb-4">
            <h1 className="text-xxl font-semibold">Contact email</h1>
            <span className="text-base text-gray-400">Manage your accounts email address.</span>
          </div>
          <div className="flex item-center justify-between">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base text-gray-500">Email</label>
              <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md" />
            </div>
            <div>
              <button className="px-4 py-2 shadow-md rounded-md ">Add new email</button>
            </div>
          </div>
        </div>
        <div className="pb-4 border-b mb-4">
          <div className="mb-4">
            <h1 className="text-xxl font-semibold">Password</h1>
            <span className="text-base text-gray-400">Modify your current password.</span>
          </div>
          <div className="flex item-center justify-between">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base text-gray-500">Current password</label>
              <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base text-gray-500">New password</label>
              <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md" />
            </div>
          </div>
        </div>
      </form>
      <div className="pb-4 border-b mb-4">
          <div className="mb-4">
            <h1 className="text-xxl font-semibold">Accounts security</h1>
            <span className="text-base text-gray-400">Manage your accounts security.</span>
          </div>
          <div className="flex item-center justify-start gap-4">
            <button className="px-4 py-2 shadow-md rounded-md ">Logout</button>
            <button className="px-4 py-2 shadow-md rounded-md text-red-500">Delete account</button>
          </div>
        </div>
    </div>
  );
};
