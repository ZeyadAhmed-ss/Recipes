import React, { useState, useRef } from "react";
import { Link } from "react-router";
import img from "../assets/unnamed.png";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  return (
    <>
      {/* Sidebar button*/}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-200 transition-colors duration-300"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75z" />
        </svg>
      </button>

      {/* Overlay*/}
      {isOpen && (
        <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
      )}


      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-950 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >

        <div className="h-full px-3 py-5 overflow-y-auto relative">
          {/* Escape button*/}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 sm:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="space-y-2 font-medium mt-10">
            <img
              src={img}
              alt="Logo"
              className="mx-auto w-50 rounded-4xl flex items-center justify-center"
            />
            <li className="pt-10">
              <Link
                to={"/"}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 px-5 py-3 rounded-xl transition-all duration-300 hover:from-orange-500 hover:to-orange-700"
              >
                All Meals
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
