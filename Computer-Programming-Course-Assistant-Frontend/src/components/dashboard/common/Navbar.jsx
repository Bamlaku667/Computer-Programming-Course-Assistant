// Navbar.js
import React from "react";
import { images } from "../../../constants";
import { FaSearch} from "react-icons/fa";

const Navbar = ({image, name}) => {
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
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-2 overflow-hidden">
                    {
                      !image && (<img src={images.profilePlaceholder} className='w-10 h-10' alt="Profile" />)
                    }
                    {
                      image && (<img src={image} className='w-10 h-10' alt="Profile" />)
                    }
                </div>
                <div className="text-dark-light">{name}</div>
            </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
