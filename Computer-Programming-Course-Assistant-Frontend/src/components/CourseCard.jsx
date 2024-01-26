import React from "react";
import { images } from "../constants";

export default function CourseCard({course}) {
  const {title, image, description, rating, modules, enrolledStudents} = course;
  return (
    <div className="relative w-72 bg-white shadow-md rounded-md overflow-hidden p-2 mb-4">
      <img
        src={image}
        alt="Course"
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="absolute top-0 left-0 p-4">
        <h3 className="border p-2 rounded-md bg-transparent text-[#66C5DB] font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 py-2 truncate ...">
        {description}
      </p>
      <div className="flex justify-between text-gray-600">
        <p>Modules: <span>{modules}</span></p>
        <p>Enrolled Students: <span>{enrolledStudents}</span></p>
      </div>
      <div className="flex items-center pb-2 border-b">
        <span className="mr-2">⭐️</span>
        <span className="text-gray-700">{rating.value} ({rating.reviews} reviews)</span>
      </div>
      <div className="flex justify-center pt-2">
        {/* <button onClick={''} className="p-1 border shadow-md rounded-md"> <img src={images.redirect} alt="redirect" /> </button> */}
      </div>
    </div>
  );
}
