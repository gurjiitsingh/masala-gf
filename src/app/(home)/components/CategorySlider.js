"use client";

import { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchCategories } from "@/app/action/category/dbOperations";
import { UseSiteContext } from "@/SiteContext/SiteContext";

export default function CategorySlider() {
  const [width, setWidth] = useState(0); // Start with 0, safe for SSR
  // const [width, setWidth] = useState(() =>
  //   typeof window !== "undefined" ? window.innerWidth : 300
  // );

  const [categoryData, setCategoryData] = useState([]);
  const {
    productCategoryIdG,
    setProductCategoryIdG,
    setDisablePickupCatDiscountIds,
  } = UseSiteContext();

  // useEffect(() => {
  //   const handleResize = () => setWidth(window.innerWidth);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    // Only access window inside useEffect
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        categories.sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder));
        const featured = categories.filter(
          (category) => category.isFeatured !== "no"
        );
        setCategoryData(featured);

        const disablePickupCategoryIds = categories
          .filter((category) => category.disablePickupDiscount === true)
          .map((category) => category.id);

          setDisablePickupCatDiscountIds(disablePickupCategoryIds);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchData();
  }, []);

  const slidesToShow = useMemo(() => {
    const breakpoints = [
      [1500, 14],
      [1400, 13],
      [1300, 12],
      [1200, 11],
      [1100, 10],
      [1000, 9],
      [900, 8],
      [800, 7],
      [700, 6],
      [600, 5],
      [500, 4],
      [400, 3],
    ];
    for (const [breakpoint, count] of breakpoints) {
      if (width > breakpoint) return count;
    }
    return 2;
  }, [width]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 2,
  };

  return (
    <div className="-mt-20 h-full w-[98%] px-2 gap-1">
      {categoryData.length > 0 && (
        <Slider {...sliderSettings}>
          {categoryData.map((category) => (
            <div key={category.id} className="mx-2">
              <button onClick={() => setProductCategoryIdG(category.id)}>
                <div className="w-[100px]">
                  <div className="flex flex-col gap-1">
                    <div
                      className={`${
                        productCategoryIdG === category.id
                          ? "primary py-1 rounded-xl"
                          : "py-1 rounded-xl"
                      }`}
                    >
                      <div className="h-fit w-fit rounded-lg px-1">
                        <img
                          className="rounded-lg h-20 w-48 object-fill"
                          src={category.image || "/com.jpg"}
                          alt={category.name || "Category"}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center w-[110px] items-center">
                      <h3 className="text-[.8rem] text-slate-600 px-0">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
