import React from "react";
import Sidebar from "../Sidebar";

interface CustomLayoutProps {
  children?: React.ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-950 flex h-screen">
      <Sidebar />
      {/* main content */}
      <div className="flex flex-col ml-80 pt-14 mt-1   rounded-lg bg-gray-900 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default CustomLayout;
