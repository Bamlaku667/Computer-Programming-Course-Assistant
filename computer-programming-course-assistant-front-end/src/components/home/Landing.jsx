import React from 'react'
import { FaSearch} from "react-icons/fa";
import image1 from '../../assets/landing/image1.svg'
import image2 from '../../assets/landing/image2.svg'
import image3 from '../../assets/landing/image3.svg'
import image4 from '../../assets/landing/image4.svg'

function Landing() {
  return (
    <div className='grid grid-cols-2 items-center h-[87vh] px-8'>
        <div className='flex flex-col gap-10'>
            <h1 className='text-[#66C5DB] text-2xl'>Start to success</h1>
            <p className='text-black text-4xl font-bold'>Access to online courses <br /> and labs with greate assistance</p>
            <div className='relative w-[28rem]'>
                <input type="text" className='block border w-full shadow-lg p-4 rounded-md focus:outline-none' placeholder='What do you want to learn?'/>
                <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                    <FaSearch className='mr-2'/>
                </button>
            </div>
        </div>
        <div className='flex'>
            <div className="relative z-10">
                <img className='w-64 h-auto' src={image1} alt="Image 1"/>
            </div>
            <div className="relative z-20 -ml-32">
                <img className='w-64 h-auto' src={image2} alt="Image 2"/>
                <div className="z-25 -mt-24">
                    <img src={image4} alt="Image 4" />
                </div>
            </div>
            <div className="relative z-30 -ml-36">
                <img className='w-64 h-auto' src={image3} alt="Image 3"/>
            </div>
        </div>
    </div>
  )
}

export default Landing