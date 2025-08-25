import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

export default function Details() {
  let { id } = useParams();
  const navigate = useNavigate(); 

  const getDetails = () =>
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

  const { data, isLoading, error } = useQuery({
    queryKey: ["details", id],
    queryFn: getDetails,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading details</div>;

  let details = data?.data?.meals[0];


  const ingredients = [];
  for (let i = 1; i <= 6; i++) {
    const ingredient = details[`strIngredient${i}`];
    const measure = details[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  if (!details) return <div>No details found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{details.strMeal}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* الصورة + زرار الرجوع */}
        <div className="md:w-1/3 w-full flex flex-col items-center">
          <img
            src={details.strMealThumb}
            alt={details.strMeal}
            className="rounded-xl shadow-lg w-full mb-4"
          />

          <button
            onClick={() => navigate("/")}
            className=" bg-amber-500 shadow rounded-xl 
            py-3 px-2 flex items-center justify-center 
            text-sm font-semibold text-white
            border border-gray-200
            hover:scale-105 hover:shadow-md 
            hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white
            transition-all duration-300 ease-out"
          >
            Back to Home
          </button>

        </div>
        <div className="md:w-2/3 w-full">
          <p className="text-gray-700 mb-6">{details.strInstructions}</p>

          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <table className="w-full text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="p-2">Ingredient</th>
                <th className="p-2">Measure</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-2 border-b border-gray-300">{item.ingredient}</td>
                  <td className="p-2 border-b border-gray-300">{item.measure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
