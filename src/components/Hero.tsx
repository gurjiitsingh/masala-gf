"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheckCircle } from "react-icons/fa";


export default function Hero() {
  
  return (
    <div className="w-screen h-screen overflow-hidden  mx-auto">
      <div className="flex flex-col-reverse lg:flex-row gap-2 h-full w-full ">
        <div
          className="rotate-[10deg]  rounded-tl-[25%] bg-[#F2F0EC]  -ml-6 lg:ml-0 pt-12 mb-16 -mt-12
        lg:rotate-0 lg:rounded-tl-0 lg:rounded-tl-none  lg:p-0 lg:mb-0 lg:mt-0"
        >
          <div className=" -rotate-[10deg] px-16 lg:rotate-0 flex flex-col w-full  lg:mt-[200px] md:pl-20  gap-5">
            <h1 className="w-full md:w-[70%] text-5xl font-extrabold text-[#FF4D4D]">
              Grandios essen - <i>die ganze Woche </i>
            </h1>
            <h2 className="w-full md:w-[70%] text-lg font-semibold">
              Praktisch, lecker und gesund.
            </h2>

            <ul>
              <li>
              <div className="flex gap-2">
                <span className="">
                  <FaCheckCircle className="text-red-500" size={20} />
                </span>

                <span className="txt-p-1 txt-p-1-s">
                  Deine Mahlzeiten für die Woche – schnell und frisch!
                </span>
                </div>
              </li>

              <li>
                <div className="flex gap-3">
                <span className="">
                  <FaCheckCircle className="text-red-500" size={20} />
                </span>

                <span className="txt-p-1 txt-p-1-s">Jederzeit kündbar.</span>
                </div>
              </li>
            </ul>

            <div className="w-full text-[#718238] text-center">Jederzeit pausieren oder kündigen</div>


            <div className="w-full  text-center">
            <button className="bg-[#718238] py-3 px-4 rounded-full">
              <span className="text-white">Pruébalo: 30% descuento</span>
              </button>

            </div>


            <div className="w-full flex justify-center ">
              <div></div>
              <div>+2,000 reviews</div>

            </div>

               </div>
        </div>
        <div className="flex flex-col w-full lg:w-[800px] lg:p-b-12">
          <div className="lg:px-[1.2rem] lg:translate-x-32 lg:translate-y-16   lg:-mt-60 lg:-mr-32 ">
            <img
              className="w-full h-full lg:rotate-[10deg]   lg:rounded-bl-[25%]"
              src="/New_Home_Hero_WidePhoto_desktop.webp"
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
