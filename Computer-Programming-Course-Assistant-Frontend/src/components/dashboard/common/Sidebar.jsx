// Sidebar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { images } from "../../../constants";
import { useAuth } from "../../../hooks/useAuthContex";
import { IoIosLogOut } from "react-icons/io";
import { sideBarRoutes } from "./sidebarRoutes";


const Sidebar = ({image}) => {
  const { user, dispatch } = useAuth();
  console.log(user.role)
  const SidebarItems = sideBarRoutes(user.role)
  const navigate = useNavigate();
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#66C5DB" : "",
      borderLeft: isActive ? "2px solid #66C5DB" : "",
      backgroundColor: isActive ? "#66C5DB1A" : "",
    };
  };

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="bg-white text-dark-light w-60 border-r">
      <div className="flex justify-center border-b py-3">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 bg-gray-300 rounded-full mr-2 overflow-hidden">
            {!image ? (
              <img
                src={images.profilePlaceholder}
                className="w-20 h-20"
                alt="Profile"
              />
            ) :
            (<img src={image} className="w-36 h-36" alt="Profile" />)}
          </div>
          <div className="">{user.email}</div>
        </div>
      </div>
      <div className="py-2 border-b">
        {SidebarItems.map((item) => (
          <div key={item.id}>
            <NavLink
              style={navLinkStyles}
              className="p-3 py-2 flex gap-x-3 items-center hover:bg-blue-400 hover:text-white"
              to={item.link}
            >
              {React.createElement(item.icon)}{" "}
              {item.name}
            </NavLink>
          </div>
        ))}
      </div>
      <div className="p-3 py-2 flex gap-x-3 items-center hover:text-xl">
          <IoIosLogOut />
          <button onClick={handleClick}>Logout</button>
        </div>
    </div>
  );
};

export default Sidebar;
