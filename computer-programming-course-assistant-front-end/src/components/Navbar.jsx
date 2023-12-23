import React from "react";
import { useAuth } from "../authentication/Auth";
import { NavLink } from "react-router-dom";
import { FaLock } from 'react-icons/fa';
import logo from '../assets/logo.svg'

export default function Navbar() {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#66C5DB" : "gray",
    };
  };
  const auth = useAuth();
  return (
    <nav className="flex justify-between py-6 px-16 items-center border border-b-2">
      <div className="">
        <img src={logo} alt="App Logo" />
      </div>
      <div className="flex gap-10 items-center">
        <NavLink style={navLinkStyles} to={"/"}>
            Home
        </NavLink>
        <NavLink style={navLinkStyles} to={"/about"}>
            About
        </NavLink>
        <NavLink style={navLinkStyles} to={"/courses"}>
            Courses
        </NavLink>
        <NavLink style={navLinkStyles} to={"/contact"}>
            Contact
        </NavLink>
        {auth.user && (
            <NavLink style={navLinkStyles} to={"/profile"}>
            Profile
            </NavLink>
        )}
      </div>
      <div className="flex gap-10 items-center">
        {!auth.user && (
            <NavLink style={navLinkStyles} className='flex gap-2 items-center' to={"/login"}>
            <FaLock/> Login
            </NavLink>
        )}
        {!auth.user && (
            <NavLink to={"/register"}>
            <button className="text-white bg-[#66C5DB] py-2 px-4 rounded-lg">Sign up</button>
            </NavLink>
        )}
      </div>
    </nav>
  );
}
