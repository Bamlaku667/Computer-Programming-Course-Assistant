import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeedbackCard from "./FeedbackCard";

function NextArrow({ className, style, onClick }) {
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#66C5DB", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }
  
  function PrevArrow({ className, style, onClick }) {
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#66C5DB", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }

  const CustomPaging = ({ onClick, index, active }) => {
    const buttonId = `dot-${index}`;
  
    const handleMouseOver = () => {
      if (!active) {
        const dotElement = document.getElementById(buttonId);
        if (dotElement) {
          dotElement.style.backgroundColor = '#388e3c';
        }
      }
    };
  
    const handleMouseLeave = () => {
      if (!active) {
        const dotElement = document.getElementById(buttonId);
        if (dotElement) {
          dotElement.style.backgroundColor = '#ccc';
        }
      }
    };
  
    const handleFocus = () => {
      const dotElement = document.getElementById(buttonId);
      if (dotElement) {
        dotElement.style.backgroundColor = '#388e3c';
      }
    };
  
    const handleBlur = () => {
      const dotElement = document.getElementById(buttonId);
      if (dotElement) {
        dotElement.style.backgroundColor = active ? '#4caf50' : '#ccc';
      }
    };
  
    return (
      <button
        id={buttonId}
        style={{
          width: '10px',
          height: '10px',
          margin: '5px',
          backgroundColor: active ? '#4caf50' : '#ccc',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onClick={onClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
      </button>
    );
  };

export default function FeedbackSlider({feedbacks}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
        <div style={{ marginTop: '10px' }}>n0-zz[=]
          {dots}
        </div>
      ),
    customPaging: (i) => <CustomPaging index={i} />,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
  };
  return (
    <Slider {...settings}>
        {feedbacks.map(feedback => (
        <div key={feedback.id}>
          <FeedbackCard feedback={feedback} />
        </div>
      ))}
    </Slider>
  );
}