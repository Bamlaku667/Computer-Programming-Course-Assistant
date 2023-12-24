import React from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/home/Landing'
import PopularCourses from '../components/home/PopularCourses'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Landing/>
      <PopularCourses/>
      <Footer/>
    </div>
  )
}

export default Home