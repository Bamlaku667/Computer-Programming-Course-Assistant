import React from 'react'
import Landing from '../components/home/Landing'
import PopularCourses from '../components/home/PopularCourses'
import Feedback from '../components/home/Feedback'
import JoinUs from '../components/home/JoinUs'

function  Home() {
  return (
    <div>
      <Landing/>
      <PopularCourses/>
      <Feedback/>
      <JoinUs/>
    </div>
  )
}

export default Home