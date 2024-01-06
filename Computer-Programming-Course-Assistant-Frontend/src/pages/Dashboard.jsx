import React, { useEffect, useState } from 'react';
import MiniCard from '../components/dashboard/MiniCard';


const Dashboard = () => {
  // State to store data fetched from the backend
  const [dashboardData, setDashboardData] = useState(null);

  // useEffect to fetch data from the backend when the component mounts
  useEffect(() => {
    // Replace this with actual API calls to fetch dashboard data
    // For simplicity, I'll use mock data
    const mockData = {
      completedCourses: 10,
      coursesInProgress: 5,
      otherAttribute: 8,
    };
    setDashboardData(mockData);
  }, [dashboardData]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* MiniCard for Completed Courses */}
        
        <MiniCard
          title="Completed Courses"
          value={dashboardData?.completedCourses || 0}
          color="green" // You can customize colors based on your theme
        />

        {/* MiniCard for Courses in Progress */}
        <MiniCard
          title="Courses in Progress"
          value={dashboardData?.coursesInProgress || 0}
          color="blue"
        />

        {/* MiniCard for Other Attribute */}
        <MiniCard
          title="Other Attribute"
          value={dashboardData?.otherAttribute || 0}
          color="orange"
        />
      </div>
    </div>
  );
};

export default Dashboard;
