import React from "react";
import { NavLink } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { images } from "../constants";
import { useAuth } from "../hooks/useAuthContex";
import { FaSearch } from "react-icons/fa";

export default function Navbar({image}) {
  const NavItemsElmts = [
    { name: "Home", link: "/" },
    { name: "Explore Courses", link: "/courses" },
  ];
  const { user } = useAuth();

  console.log("User:", user);

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#66C5DB" : "gray",
    };
  };

  return (
    <nav className="flex justify-between py-4 pl-16 pr-4 items-center border border-b-2 sticky top-0 z-50 bg-white">
      <div className="">
        <img src={images.Logo} alt="App Logo" />
      </div>
      <div className="relative">
        <input
          type="text"
          className="text-base focus:outline-none border py-2 pl-4 w-96"
          placeholder="What do you want to learn?"
        />
        <button className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-gray-500 cursor-pointer border py-3 px-2 bg-black">
          <FaSearch className="text-white" />
        </button>
      </div>
      <div className="flex gap-10 items-center">
        {NavItemsElmts.map((item, index) => (
          <NavLink key={index} style={navLinkStyles} to={item.link}>
            {item.name}
          </NavLink>
        ))}
        {user && (
          <NavLink style={navLinkStyles} to={"/dashboard"}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-2 overflow-hidden">
                {!image ? (
                  <img
                    src={images.profilePlaceholder}
                    className="w-10 h-10"
                    alt="Profile"
                  />
                ) :
                (<img src={image} className="w-10 h-10" alt="Profile" />)}
              </div>
              <div className="">{user.email}</div>
            </div>
          </NavLink>
        )}
      </div>
      {!user && (
        <div className="flex gap-10 items-center">
          <NavLink
            style={navLinkStyles}
            className="flex gap-2 items-center"
            to={"/login"}
          >
            <FaLock /> Login
          </NavLink>
          <NavLink to={"/register"}>
            <button className="text-white bg-[#66C5DB] py-2 px-4 rounded-lg">
              Sign up
            </button>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
