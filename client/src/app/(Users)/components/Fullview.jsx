"use client";

import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Image from "next/image";

export default function Fullviewimage() {
  const slides = [
    {
      url: "/superior-garden-view-full.png",
    },
    {
      url: "/deluxe-full.png",
    },
    {
      url: "/superior-full.png",
    },

    {
      url: "/supreme-full.png",
    },
    {
      url: "/SuperiorGardenView-1024x683.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="bg-green-500 max-w-[1400px] max-h-[900px] w-full h-auto m-auto py-16 px-4 group flex flex-col items-center ">
      <div className=" bg-red-300 w-[50%] h-[50%] rounded-2xl bg-center bg-cover duration-500 relative">
        <Image
          src={slides[currentIndex].url}
          alt="superior-garden-view-full" //ควรเอาไปใส่ในอะเรย์
          width={930}
          height={581}
          className="w-full h-full object-cover "
        />
      
      {/* Left Arrow : Previous Image (-1) */}
      <div className="hidden group-hover:block absolute top-[45%] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow : Next Image (+1) */}
      <div className="hidden group-hover:block absolute top-[45%] right-0 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      
      <div className="flex justify-center items-center py-2 absolute bottom-0 left-[45%]">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="opacity-30 hover:opacity-100 text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
