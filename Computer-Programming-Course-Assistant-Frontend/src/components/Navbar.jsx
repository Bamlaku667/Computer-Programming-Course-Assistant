import React from "react";
import { NavLink } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { images } from "../constants";
import { useAuth } from "../hooks/useAuthContex";

export default function Navbar() {
  const NavItemsElmts = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Courses", link: "/courses" },
    { name: "Contact", link: "/contact" },
  ];
  const { user } = useAuth();

  console.log("User:", user);

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#66C5DB" : "gray",
    };
  };

  return (
    <nav className="flex justify-between py-4 px-16 items-center border border-b-2 sticky top-0 z-50 bg-white">
      <div className="">
        <img src={images.Logo} alt="App Logo" />
      </div>
      <div className="flex gap-10 items-center">
        {NavItemsElmts.map((item, index) => (
          <NavLink style={navLinkStyles} to={item.link}>
            {item.name}
          </NavLink>
        ))}
        {user && (
          <NavLink style={navLinkStyles} to={"/dashboard"}>
            {user.email}
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
