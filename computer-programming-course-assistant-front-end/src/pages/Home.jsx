import React from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/home/Landing'
import PopularCourses from '../components/home/PopularCourses'

function Home() {
  return (
    <div>
      <Navbar/>
      <Landing/>
      <PopularCourses/>
    </div>
  )
}

export default Home