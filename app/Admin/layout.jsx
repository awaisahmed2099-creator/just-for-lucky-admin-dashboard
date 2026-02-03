"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function DashboardLayout({ children }) {
  // Sidebar ki hover state ko monitor karne ke liye
  const [isHovered, setIsHovered] = useState(false);

  return (
    // Background strictly matches your professional dark theme
    <div className="flex min-h-screen bg-[#1e293b] overflow-hidden font-sans">
      
      {/* Sidebar Wrapper: Hover events yahan se control honge */}
      <div 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        className="z-50"
      >
        <Sidebar />
      </div>

      {/* Main content area: Topbar aur Children dono sidebar ke sath move karenge */}
      <div className={`flex flex-col flex-1 transition-all duration-500 ease-in-out ${
          isHovered ? "ml-64" : "ml-16"
        }`}
      >
        {/* Topbar: Fixed position mein rahay ga aur sidebar ke sath slide hoga */}
        <Topbar />

       {/* Layout file mein main tag ko aisay update karein */}
<main className="px-4 md:px-8 pt-0 flex-1 overflow-auto"> 
  {children}
</main>
      </div>
    </div>
  );
}