import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuthContex";
import { images } from "../constants";
import MainLayout from "../components/dashboard/common/MainLayout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Profile = ({image}) => {
  const { user, dispatch } = useAuth();
  const [error, setError] = useState("");
  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    password: '',
  })
  const navigate = useNavigate();

  useEffect(() => {
    // setUpdatedUserData(userData);
    const fetchUserData = async () => {
      try {
        if (user.token) {
          const response = await axios.get('https://courseassistant.vercel.app/api/v1/student/profile', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          setUpdatedUserData(response.data)
          console.log(response.data)
        }
      } catch (error) {
        setError(error)
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    dispatch({type: 'LOGOUT'})
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateUser = (e) => {
    e.preventDefault();
    const updateUserData = async () => {
      try {
        if (user.token) {
          const response = await axios.patch('https://courseassistant.vercel.app/api/v1/student/profile',
          updatedUserData,
          {
            headers: {
              'Authorization': `Bearer ${user.token}`
            },
          });
          console.log('Update successfull', response.data)
        }
      } catch (error) {
        setError(error)
        console.error('Error updating data:', error.response.data);
      }
    }
    updateUserData();
  }

  const deleteUser = () => {
    const deleteUser = async () =>{

    }
  }

  return (
    <div>
      <Navbar/>
      <MainLayout>
      <div className="container mx-auto">
        <div className='p-12 bg-gradient-to-r from-white to-[#66C5DB]'>
          <h1 className="text-2xl font-bold">Account</h1>
          <span className="text-base text-gray-400">Real time informations and activities of your properties.</span>
        </div>
        <div className="bg-white m-4 p-4 rounded-md shadow-sm">
          <form action="">
            <div className="flex justify-end mb-4">
              <button className="px-4 py-2 shadow-md rounded-md bg-blue-500 text-white" onClick={updateUser}>Save changes</button>
            </div>
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
                  <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md" name="firstName" value={updatedUserData.firstName} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-base text-gray-500">Last name</label>
                  <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md" name="lastName" value={updatedUserData.lastName} onChange={handleInputChange}/>
                </div>
              </div>
            </div>
            <div className="pb-4 border-b mb-4">
              <div className="mb-4">
                <h1 className="text-xxl font-semibold">User address</h1>
                <span className="text-base text-gray-400">Manage your address.</span>
              </div>
              <div className="flex item-center justify-between">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-base text-gray-500">Address</label>
                  <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md" name="address" value={updatedUserData.address} onChange={handleInputChange}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-base text-gray-500" >Phone</label>
                  <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md" name="phone" value={updatedUserData.phone} onChange={handleInputChange}/>
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
                  <input type="text" className="w-96 px-2 py-1 border-2 text-sm focus:outline-none rounded-md"/>
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
              <button onClick={logout} className="px-4 py-2 shadow-md rounded-md ">Logout</button>
              <button className="px-4 py-2 shadow-md rounded-md text-red-500" onClick={deleteUser}>Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
    <Footer/>
    </div>
  );
};
