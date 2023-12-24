import React from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/home/Landing'
import PopularCourses from '../components/home/PopularCourses'
import Footer from '../components/Footer'
import Feedback from '../components/home/Feedback'

function Home() {
  return (
    <div>
      <Navbar/>
      <Landing/>
      <PopularCourses/>
      <Feedback/>
      <Footer/>
    </div>
  )
}

export default Home