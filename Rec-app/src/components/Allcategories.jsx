import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

export default function Allcategories() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("c");

  function getCategories() {
    return axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["allcategories"],
    queryFn: getCategories,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-amber-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg sm:text-xl font-semibold text-gray-800">
            Loading...
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Error: {error.message}</p>
    );

  return (
    <div className="sm:ml-56 p-4">
      <div className="container mx-auto px-4">
        <h2 className="md:pt-5 text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-300 pb-6">
          All Categories
        </h2>

        <div className="sm:ps-5 sm:pe-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {data?.data?.meals.map((meal, index) => {
            const isActive = activeCategory === meal.strCategory;
            return (
              <Link
                to={`?c=${meal.strCategory}`}
                key={index}
                className={`
                  py-3 px-2 flex items-center justify-center text-sm font-semibold rounded-xl border transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-800 border-gray-200 hover:scale-105 hover:shadow-md hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white"
                  }
                `}
              >
                {meal.strCategory}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
