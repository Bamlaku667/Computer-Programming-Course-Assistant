import React, { useEffect, useState } from "react";
import MainLayout from "../components/dashboard/common/MainLayout";
import { NavLink } from "react-router-dom";
import MiniCard from "../components/dashboard/MiniCard";
import { useAuth } from "../hooks/useAuthContex";

const InstructorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
//   const { user } = useAuth();
  console.log("user", user);
  useEffect(() => {
    const mockData = {
      completedCourses: 10,
      coursesInProgress: 5,
      otherAttribute: 8,
    };
  }, []);
  const navLinkStyles = ({ isActive }) => {
    return {
      borderBottom: isActive ? "#66C5DB" : "gray",
    };
  };
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-white to-[#66C5DB]">
          <h1 className="p-12 text-4xl">
            Ysihak's Dashboard - let's jump back in.
          </h1>
          <div className="px-8 text-gray-700">
            <NavLink to={""} style={navLinkStyles}>
              <button className="text-2xl font-bold border-b-2 border-[#66C5DB]">
                Overview
              </button>
            </NavLink>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <MiniCard
            title="Completed Courses"
            value={dashboardData?.completedCourses || 0}
            color="green"
          />
          <MiniCard
            title="Courses in Progress"
            value={dashboardData?.coursesInProgress || 0}
            color="blue"
          />
          <MiniCard
            title="Other Attribute"
            value={dashboardData?.otherAttribute || 0}
            color="orange"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default InstructorDashboard;
