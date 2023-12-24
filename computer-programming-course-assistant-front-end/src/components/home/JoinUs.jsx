import React from "react";
import people from "../../assets/people.svg";
import { Link } from "react-router-dom";

function JoinUs() {
  return (
    <div className="grid grid-cols-2 gap-10 h-screen items-center bg-[#E7F6F9] rounded-tl-[50px] px-8">
      <div className="">
        <img src={people} alt="poeple" />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold">
          Join your{" "}
          <span className="text-[#66C5DB]">journey to development</span> today
        </h1>
        <p className="text-gray-700">Start learning by registering for free</p>
        <Link to="/register">
          <button className="text-white bg-[#66C5DB] py-2 px-4 rounded-lg">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default JoinUs;
