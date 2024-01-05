import React from "react";
import { images } from "../../constants";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white  rounded-md shadow-md">
      {/* Display course images (you can customize this based on your design) */}
      <div className="flex mt-4">
        {course.images.map((image) => (
          <img
            key={image}
            src={images.jsImage} // Replace with the actual path to your images
            alt={`Course Image ${course.title}`}
            className="w-full mr-2 object-cover"
          />
        ))}
      </div>
      {/* Display course properties */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-2">{course.description}</p>
        <p className="text-sm text-gray-500">Modules: {course.modules}</p>
        <p className="text-sm text-gray-500">
          Enrolled Students: {course.enrolledStudents}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
