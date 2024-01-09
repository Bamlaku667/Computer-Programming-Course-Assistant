import React from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/home/Landing'
import PopularCourses from '../components/home/PopularCourses'
import Footer from '../components/Footer'
import Feedback from '../components/home/Feedback'
import JoinUs from '../components/home/JoinUs'

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