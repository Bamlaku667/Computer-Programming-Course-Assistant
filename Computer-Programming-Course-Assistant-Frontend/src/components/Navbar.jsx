import React from "react";
import { useAuth } from "../authentication/Auth";
import { NavLink } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { images } from "../constants";

export default function Navbar() {
  const NavItemsElmts = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Courses", link: "/courses" },
    { name: "Contact", link: "/contact" },
  ];
  
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#66C5DB" : "gray",
    };
  };

  const auth = useAuth();
  return (
    <nav className="flex justify-between py-4 px-16 items-center border border-b-2 sticky top-0 z-50 bg-white">
      <div className="">
        <img src={images.Logo} alt="App Logo" />
      </div>
      <div className="flex gap-10 items-center">
        {NavItemsElmts.map((item, index) => (
          <NavLink  style={navLinkStyles} to={item.link}>
            {item.name}
          </NavLink>
        ))}
        {auth.user && (
          <NavLink style={navLinkStyles} to={"/profile"}>
            Profile
          </NavLink>
        )}
      </div>
      {!auth.user && (
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
