"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function ImageSlide() {

  const roomImage = [
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

// function กดเลื่อนรูปซ้ายขวา
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? roomImage.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === roomImage.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

// function กดไข่ปลาดูรูปที่ต้องการ
    const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative flex w-full mx-auto overflow-hidden max-w-7xl bg-black">
      <div className="relative flex w-full max-w-xl gap-10 mx-auto">
        <div className="absolute z-20 w-full transition-opacity duration-500 -translate-x-1/2 bg-black opacity-50 h-96 -left-80">
        </div>

        <Image
          src={roomImage[currentIndex - 1 < 0 ? roomImage.length - 1 : currentIndex - 1].url}
                      
          alt={`image`}
          className="absolute object-cover w-full transition-opacity duration-500 -translate-x-1/2 -left-80 h-96"
          width={300}
          height={300}
        />
        <Image
          src={roomImage[currentIndex].url}
          alt={`image`}
          className="object-cover w-full transition-opacity duration-500 h-96"
          width={300}
          height={300}
        />
        {/* เพิ่มไข่ปลาเลื่อนรูป */}
        <div className="flex justify-center items-center py-2 absolute bottom-0 left-[40%]">
         {roomImage.map((slide, slideIndex) => (
          <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="opacity-30 hover:opacity-100 text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>

        <div className="absolute z-20 w-full transition-opacity duration-500 translate-x-1/2 bg-black opacity-50 h-96 left-80"></div>
        <Image
          src={roomImage[(currentIndex + 1) % roomImage.length].url}
          alt={`image`}
          className="absolute object-cover w-full transition-opacity duration-500 translate-x-1/2 left-80 h-96"
          width={300}
          height={300}
        />
      </div>

      {/* ใส่ปุ่มเลื่อนรูปซ้ายขวา */}
      <div
        className="absolute z-30 -translate-y-1/2 cursor-pointer top-1/2 left-64 text-2xl rounded-full p-2 bg-black/20 text-white"
      >
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div
        className="absolute z-30 -translate-y-1/2 cursor-pointer top-1/2 right-64 text-2xl rounded-full p-2 bg-black/20 text-white"
      >
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
    </div>
  );
}
