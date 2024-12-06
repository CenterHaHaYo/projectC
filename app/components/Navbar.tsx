"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
    
      <button
        onClick={toggleDrawer}
        className="fixed top-4 left-4 p-2 bg-blue-500 text-white rounded-md shadow-lg focus:outline-none"
      >
        ☰
      </button>

      
      {isDrawerOpen && (
        <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg z-50">
          <button
            onClick={toggleDrawer} // ปิด Drawer เมื่อกดปุ่ม Close
            className="p-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 ml-2 mt-2"
          >
            ✕
          </button>
          <ul className="mt-4">
            <li>
              <button
                onClick={() => {
                  toggleDrawer(); 
                  router.push("/collection");
                }}
                className="block p-4 text-blue-500 hover:bg-gray-100"
              >
                My Collection
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleDrawer(); 
                  router.push("/login");
                }}
                className="block p-4 text-blue-500 hover:bg-gray-100"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
