"use client";
import { React, useRef } from "react";
import AboutImage from "./AboutImage";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const AboutRow = ({ customers }) => {
  const mockImages = [
    "/supreme.jpg",
    "/deluxe.png",
    "/superior-garden-view.png",
    "/supreme-w543.png",
    "/premier-sea-view.png",
    "/deluxe.png",
    "/supreme-w543.png",
    "/supreme-full.png",
  ];

  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  const limitedImage = mockImages.slice(0, 10);

  return (
    <>
      <div className="flex items-center w-full mb-20 overflow-hidden group">
        <MdChevronLeft
          onClick={slideLeft}
          className="absolute left-0 z-10 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block"
          size={40}
        />
        <div
          ref={sliderRef}
          className="relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide p-7"
        >
          {limitedImage.map((item, id) => (
            <AboutImage key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="absolute right-0 z-10 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default AboutRow;
