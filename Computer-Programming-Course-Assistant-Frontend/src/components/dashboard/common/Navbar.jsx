// Navbar.js
import React from "react";
import { images } from "../../constants/images";
import { FaSearch} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white">
      <div className="flex justify-between items-center border-y p-3">
        <div className='relative'>
            <input type="text" className='block text-dark-light font-bold text-xl px-8 focus:outline-none' placeholder='What do you want to learn?'/>
            <button className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                <FaSearch className=''/>
            </button>
        </div>
        <div className="flex gap-x-4 ">
            <div className="flex items-center gap-x-2">
                <img src = {images.profile} className=""/>
                <div className="text-dark-light">John Peterson</div>
            </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
