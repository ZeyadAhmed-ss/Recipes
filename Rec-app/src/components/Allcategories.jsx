import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Allcategories() {
  function getCategories() {
    return axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["allcategories"],
    queryFn: getCategories,
  });

  if (isLoading)
    return (
      <p className="text-center text-lg text-gray-500 py-10">Loading...</p>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Error: {error.message}</p>
    );

  return (
    <div className="sm:ml-56 p-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-300 pb-6">
          All Categories
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {data?.data?.meals.map((meal, index) => (
            <Link
              to={`?c=${meal.strCategory}`}
              key={index}
              className="
            bg-white shadow rounded-xl 
            py-3 px-2 flex items-center justify-center 
            text-sm font-semibold text-gray-800
            border border-gray-200
            hover:scale-105 hover:shadow-md 
            hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white
            transition-all duration-300 ease-out
          "
            >
              {meal.strCategory}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
