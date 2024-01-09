// MainLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-background">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 mt-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
