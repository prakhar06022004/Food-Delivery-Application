import React from "react";
import { categories } from "../category.js";
function CategoryCards({ data }) {
  return (
    <div className="w-28 h-28 sm:w-32 sm:h-32 border rounded-2xl p-1 overflow-hidden bg-white shadow-xl shrink-0 relative">
      
      <img
        src={data.image}
        alt={data.category}
        className="w-full h-full object-cover rounded-2xl cursor-pointer hover:scale-110 transition-transform duration-250"
      />
      <div className="w-full absolute bottom-0 left-0 text-center bg-amber-50">{data.category}</div>
      
    </div>
  );
}

export default CategoryCards;
