import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

function Footer() {
  return (
    <div className='bg-primary flex flex-col gap-5 p-16 text-white'>
      <Link to={'/'}><img src={logo} alt="App Logo" /></Link>
      <div className='grid grid-cols-4 gap-10'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-lg font-bold'>Contact us</h1>
          <div className='flex flex-col text-white gap-2'>
            <p>Address: <span className='font-bold'>Addis Ababa, Ethiopia</span></p>
            <p>Call: <span className='font-bold'>+251000000000</span></p>
            <p>Email: <span className='font-bold'>example@gmail.com</span></p>
          </div>
          <div className='flex gap-2'>
            <Link to={'/'} className='p-1 border shadow-sm rounded-md bg-white'><FaFacebook className='text-[#66C5DB]'/></Link>
            <Link to={'/'} className='p-1 border shadow-sm rounded-md bg-white'><FaLinkedin className='text-[#66C5DB]'/></Link>
            <Link to={'/'} className='p-1 border shadow-sm rounded-md bg-white'><FaInstagram className='text-[#66C5DB]'/></Link>
            <Link to={'/'} className='p-1 border shadow-sm rounded-md bg-white'><FaTelegram className='text-[#66C5DB]'/></Link>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <h1 className='text-lg font-bold'>Explore</h1>
          <div className='flex flex-col gap-2 text-white'>
            <Link to='/'>Home</Link>
            <Link to='/courses'>Explorer Courses</Link>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <h1 className='text-lg font-bold'>Category</h1>
          <div className='flex flex-col gap-2 text-white'>
            <Link to='/'>Design</Link>
            <Link to='/'>Development</Link>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <h1 className='text-lg font-bold'>Send Us Email</h1>
          <div className='flex flex-col gap-2 text-white'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Dolorum nemo totam explicabo accusamus enim
            </p>
            <div className='flex flex-col gap-2'>
              <input type="text" placeholder='Email here' className='focus:outline-none w-full px-4 py-2 rounded-md bg-gray-200'/>
              <button className='bg-[#66C5DB] py-2 px-4 rounded-md text-white w-fit'>Send</button>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Footer