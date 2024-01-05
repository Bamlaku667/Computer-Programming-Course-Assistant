// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard, MdLibraryBooks } from "react-icons/md";
import { CiStickyNote } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { IoThermometerOutline } from "react-icons/io5";
import { images } from "../../../constants";

const SidebarItems = [
  { id: 1, name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
  { id: 2, name: "MyCourses", link: "/myCourses", icon: MdLibraryBooks },
  { id: 3, name: "Notes", link: "/notes", icon: CiStickyNote },
  { id: 4, name: "Messages", link: "/messages", icon: TiMessages },
  {
    id: 5,
    name: "Other attributes",
    link: "/otherAttributes",
    icon: IoThermometerOutline,
  },
];

const Sidebar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#66C5DB" : "",
      borderLeft: isActive ? "2px solid #66C5DB" : "",
      backgroundColor: isActive ? "#66C5DB1A" : "",
    };
  };
  return (
    <div className="bg-primary text-dark-light w-60">
      <div className="flex justify-center border-b py-3">
        <img src={images.Logo} alt="App Logo" />
      </div>
      <div className="py-2">
        {SidebarItems.map((item) => (
          <div key={item.id} >
            <NavLink
              style={navLinkStyles}
              className=" p-3  py-2 flex gap-x-3 items-center hover:bg-secondary hover:text-white"
              to={item.link}
            >
              {React.createElement(item.icon)} {/* Render the icon dynamically */}
              {item.name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
