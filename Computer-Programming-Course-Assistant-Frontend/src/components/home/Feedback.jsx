import React from 'react'
import profile from '../../assets/profile.svg'
import FeedbackSlider from './FeedbackSlider'
import { images } from '../../constants'


function Feedback() {
  const feedbacks = [
    {
        image: images.profile,
        name : "John Doe",
        course: "UI/UX",
        message: "Excellent service! The team was very helpful and responsive. Excellent service! The team was very helpful and responsive."
    },
    {
        image: '',
        name : "John Doe",
        course: "UI/UX",
        message: "Excellent service! The team was very helpful and responsive. Excellent service! The team was very helpful and responsive."
    },
    {
        image: images.profile,
        name : "John Doe",
        course: "UI/UX",
        message: "Excellent service! The team was very helpful and responsive. Excellent service! The team was very helpful and responsive."
    },
    {
        image: images.profile,
        name : "John Doe",
        course: "UI/UX",
        message: "Excellent service! The team was very helpful and responsive. Excellent service! The team was very helpful and responsive."
    }
  ]
  return (
    <div className='flex flex-col justify-center gap-10 h-screen px-16'>
        <div className=''>
            <h1 className='text-3xl font-bold'>Student <span className='text-primary'>Feedback</span></h1>
            <p className='text-gray-500'>Various versions have evolved over the years, sometimes by accident,</p>
        </div>
        <div className='w-[90vw]'>
          <FeedbackSlider feedbacks={feedbacks}/>
        </div>
    </div>
  )
}

export default Feedback