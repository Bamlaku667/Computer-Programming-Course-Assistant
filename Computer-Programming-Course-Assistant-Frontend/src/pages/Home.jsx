import React from 'react'
import Landing from '../components/home/Landing'
import PopularCourses from '../components/home/PopularCourses'
import Feedback from '../components/home/Feedback'
import JoinUs from '../components/home/JoinUs'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function  Home() {
  return (
    <div>
      <Navbar/>
      <Landing/>
      <PopularCourses/>
      <Feedback/>
      <JoinUs/>
      <Footer/>
    </div>
  )
}

export default Home