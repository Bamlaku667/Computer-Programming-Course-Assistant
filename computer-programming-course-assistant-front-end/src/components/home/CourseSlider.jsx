import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./CourseCard";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function NextArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#66C5DB",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#66C5DB",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

export default function CourseSlider({ courses }) {
  const sliderRef = useRef(null);
  const next = () => {
    console.log("next button clicked");
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    console.log("previous button clicked");
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
    <div className="flex flex-col gap-16">
      <Slider ref={sliderRef} {...settings}>
        {courses.map((course) => (
          <div key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </Slider>
      <div className="flex gap-2 justify-end mr-5">
        <button
          className="cursor-pointer bg-white hover:bg-[#66C5DB] p-1 border shadow-sm rounded-md"
          onClick={() => previous()}
        >
          <IoIosArrowForward />
        </button>
        <button
          className="cursor-pointer bg-white hover:bg-[#66C5DB] p-1 border shadow-sm rounded-md"
          onClick={() => next()}
        >
          <IoIosArrowBack />
        </button>
      </div>
    </div>
  );
}
