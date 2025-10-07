import Navbar from "./Navbar";
import { categories } from "../category";
import CategoryCards from "./categoryCards";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FoodCardsCity from "./FoodCardsCity";

const UserDashboard = () => {
  const { city, shopInMyCity, itemsInMyCity } = useSelector(
    (state) => state.user
  );
  console.log(shopInMyCity);
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();

  const [ScrollLeftArrow, setScrollLeftArrow] = useState(false);
  const [ScrollRightArrow, setScrollRightArrow] = useState(false);
  const [ScrollShopLeftArrow, setScrollShopLeftArrow] = useState(false);
  const [ScrollShopRightArrow, setScrollShopRightArrow] = useState(false);

  const updateButtonScroll = (ref, leftArrow, rightArrow) => {
    const element = ref.current;
    // console.log(element);
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
      updateButtonScroll(
        cateScrollRef,
        setScrollLeftArrow,
        setScrollRightArrow
      );
      updateButtonScroll(
        shopScrollRef,
        setScrollShopLeftArrow,
        setScrollShopRightArrow
      );
    };

    // initial check
    handleScroll();

    // scroll listener
    const element = cateScrollRef.current;
    element.addEventListener("scroll", handleScroll);
    const shopElement = shopScrollRef.current;
    shopElement.addEventListener("scroll", handleScroll);
    // cleanup with null check
    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
      if (shopElement) {
        shopElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Navbar />
      <div className="w-full max-w-6xl shadow-lg flex flex-col gap-5 items-start p-[10px] pt-[100px]">
        <h1 className="sm:text-2xl text-[22px] p-2 font-fredoka font-medium shadow-sm "> Inspiration for your first order!</h1>
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
              <CategoryCards
                key={index}
                name={cate?.category}
                image={cate?.image}
              />
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
      <div className="w-full max-w-6xl shadow-lg flex flex-col gap-2 items-start p-[10px] text-2xl">
        <h1 className="sm:text-2xl text-[22px] p-2 font-fredoka font-medium shadow-sm">{`Best Shop In ${city}`}</h1>
        <div className="w-full overflow-hidden flex relative">
          {ScrollShopLeftArrow && (
            <button className="hidden md:block ">
              <FaRegArrowAltCircleLeft
                className="absolute z-10 bg-amber-600 text-3xl text-white rounded-full top-1/3 left-0 hover:bg-amber-700 duration-200 cursor-pointer"
                onClick={() => scrollHandler(shopScrollRef, "left")}
              />
            </button>
          )}

          <div
            className="w-full flex gap-5 overflow-x-auto shrink-0 flex-nowrap overflow-hidden"
            ref={shopScrollRef}
          >
            {shopInMyCity?.map((shop, index) => (
              <CategoryCards
                key={index}
                name={shop?.name}
                image={shop?.image}
              />
            ))}
          </div>
          {ScrollShopRightArrow && (
            <button className="hidden md:block ">
              <FaRegArrowAltCircleRight
                className="absolute z-10 bg-amber-600 text-3xl text-white rounded-full top-1/3 right-0 hover:bg-amber-700 duration-200 cursor-pointer"
                onClick={() => scrollHandler(shopScrollRef, "right")}
              />
            </button>
          )}
        </div>
      </div>
      <div className="w-full max-w-6xl shadow-lg flex flex-col gap-2 items-start p-[10px] text-2xl">
        <h1 className="sm:text-2xl text-[22px] text-center p-2 font-fredoka font-medium shadow-sm">Suggested Food Items In Your City!</h1>
        <div className="w-full flex gap-5 justify-center items-center p-2 h-auto flex-wrap sm:flex-nowrap">
        {itemsInMyCity?.map((foodItems, index) => {
          return <FoodCardsCity key={index} data={foodItems} />;
        })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
