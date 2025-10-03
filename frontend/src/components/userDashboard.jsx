import Navbar from "./Navbar";
import { categories } from "../category";
import CategoryCards from "./categoryCards";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const UserDashboard = () => {
  const cateScrollRef = useRef();
  const [ScrollLeftArrow, setScrollLeftArrow] = useState(false);
  const [ScrollRightArrow, setScrollRightArrow] = useState(false);

  const updateButtonScroll = (ref, leftArrow, rightArrow) => {
    const element = ref.current;
    console.log(element);
    if (element) {
      leftArrow(element.scrollLeft > 0);
    }
    rightArrow(element.scrollLeft + element.clientWidth < element.scrollWidth);
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

useEffect(() => {
  const handleScroll = () => {
    updateButtonScroll(cateScrollRef, setScrollLeftArrow, setScrollRightArrow);
  };

  // initial check
  handleScroll();

  // scroll listener
  const element = cateScrollRef.current;
  element.addEventListener("scroll", handleScroll);

  // cleanup with null check
  return () => {
    if (element) {
      element.removeEventListener("scroll", handleScroll);
    }
  };
}, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Navbar />
      <div className="w-full max-w-6xl shadow-lg flex flex-col gap-5 items-start p-[10px] pt-[80px]">
        <h1 className="text-2xl p-2"> Inspiration for your first order!</h1>
        <div className="w-full overflow-hidden flex relative">
          {ScrollLeftArrow && (
            <button className="hidden md:block ">
              <FaRegArrowAltCircleLeft
                className="absolute z-10 bg-amber-600 text-3xl text-white rounded-full top-1/3 left-0 hover:bg-amber-700 duration-200 cursor-pointer"
                onClick={() => scrollHandler(cateScrollRef, "left")}
              />
            </button>
          )}

          <div
            className="w-full flex gap-5 overflow-x-auto shrink-0 flex-nowrap overflow-hidden"
            ref={cateScrollRef}
          >
            {categories.map((cate, index) => (
              <CategoryCards key={index} data={cate} />
            ))}
          </div>
          {ScrollRightArrow && (
            <button className="hidden md:block ">
              <FaRegArrowAltCircleRight
                className="absolute z-10 bg-amber-600 text-3xl text-white rounded-full top-1/3 right-0 hover:bg-amber-700 duration-200 cursor-pointer"
                onClick={() => scrollHandler(cateScrollRef, "right")}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
