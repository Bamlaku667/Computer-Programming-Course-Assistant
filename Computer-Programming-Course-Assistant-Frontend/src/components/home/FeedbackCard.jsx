import React from 'react';
import quote from '../../assets/quote.svg'

const FeedbackCard = ({feedback}) => {
  const { image, name, course, message } = feedback;
  return (
    <div className="relative bg-white p-6 rounded-md shadow-md w-auto mr-5 mb-5">
      <div className='absolute top-0 right-0 m-2'><img src={quote} alt="quote" /></div>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-2">
            <img src={image} alt="Profile" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">{course} student</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{message}</p>
    </div>
  );
};

export default FeedbackCard;
