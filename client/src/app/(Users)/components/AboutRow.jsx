"use client";
import { React, useRef } from "react";
import AboutImage from "./AboutImage";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const AboutRow = ({ customers }) => {
  const mockImages = [
    "https://placedog.net/640/480?random",
    "/superior-garden-view-full.png",
    "/superior-garden-view.png",
    "https://placedog.net/640/480?random",
    "https://placedog.net/640/480?random",
    "https://placedog.net/640/480?random",
    "https://placedog.net/640/480?random",
    "https://placedog.net/640/480?random",
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
      <div className="w-full overflow-hidden flex items-center group mt-[100px] mb-[100px]">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {limitedImage.map((item, id) => (
            <AboutImage key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default AboutRow;
