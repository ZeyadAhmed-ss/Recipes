import React from "react";
import Allcategories from "../../components/Allcategories";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  let category = searchParams.get("c");

  category = category ? category : "Beef";

  function AllMeals() {
    return axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["allmeals", category],
    queryFn: AllMeals,
    select: (data) => data.data.meals,
    keepPreviousData: true,
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
      <p className="text-center text-red-500 pt-100">Error: {error.message}</p>
    );

  if (data) {
    return (
      <>
        <div className="w-full">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-300 
                 px-4 sm:px-6 md:ml-56 md:px-0
                 py-4
                 truncate"
          >
            Learn, cook, Eat Your Food
          </h1>
        </div>

        <Allcategories />

        <div className="sm:ml-56 p-4">
          <div className="container mx-auto px-4">
            <div className="sm:ps-5 sm:pe-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {data.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                >
                  {/* Meals img */}
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-40 object-cover"
                  />

                  {/* Meals title */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {meal.strMeal}
                    </h3>

                    {/* Meals button */}
                    <a
                      href={`/meal/${meal.idMeal}`}
                      className="inline-block mt-3 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-xl shadow-md transition-all duration-300 hover:bg-amber-600 hover:scale-105"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return <></>;
}
