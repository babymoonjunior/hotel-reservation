"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function ImageSlide({ roomImage }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideClick = (action) => {
    if (action === "right") {
      setCurrentIndex((prevIndex) =>
        prevIndex === roomImage.length - 1 ? 0 : prevIndex + 1
      );
    } else if (action === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? roomImage.length - 1 : prevIndex - 1
      );
    }
  };
  return (
    <div className="relative flex w-full mx-auto overflow-hidden max-w-7xl">
      <div className="relative flex w-full max-w-xl gap-10 mx-auto">
        <div className="absolute z-20 w-full transition-opacity duration-500 -translate-x-1/2 bg-black opacity-50 h-96 -left-80"></div>

        <Image
          src={
            roomImage[
              currentIndex - 1 < 0 ? roomImage.length - 1 : currentIndex - 1
            ]
          }
          alt={`image`}
          className="absolute object-cover w-full transition-opacity duration-500 -translate-x-1/2 -left-80 h-96"
          width={300}
          height={300}
        />
        <Image
          src={roomImage[currentIndex]}
          alt={`image`}
          className="object-cover w-full transition-opacity duration-500 h-96"
          width={300}
          height={300}
        />
        <div className="absolute z-20 w-full transition-opacity duration-500 translate-x-1/2 bg-black opacity-50 h-96 left-80"></div>
        <Image
          src={roomImage[(currentIndex + 1) % roomImage.length]}
          alt={`image`}
          className="absolute object-cover w-full transition-opacity duration-500 translate-x-1/2 left-80 h-96"
          width={300}
          height={300}
        />
      </div>
      <div
        onClick={() => handleSlideClick("left")}
        className="absolute z-30 -translate-y-1/2 cursor-pointer top-1/2 left-64"
      >
        <Image src="/arrow-back.png" alt="arrow" width={40} height={40} />
      </div>
      <div
        onClick={() => handleSlideClick("right")}
        className="absolute z-30 -translate-y-1/2 cursor-pointer top-1/2 right-64"
      >
        <Image
          src="/arrow-back.png"
          style={{ transform: "rotate(180deg)" }}
          alt="arrow"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
}
