"use client";
import { React, useRef } from "react";
import AboutImage from "./AboutImage";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Image from "next/image";
// ลบ { customers } (Wen)
const AboutRow = () => {
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
        <div>
          <Image
            src={"./arrowL.png"}
            width={56}
            height={56}
            onClick={slideLeft}
            className="absolute left-10 z-10 hidden  rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block"
          ></Image>
        </div>
        <div
          ref={sliderRef}
          className="relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide p-7"
        >
          {limitedImage.map((item, id) => (
            <AboutImage key={id} item={item} />
          ))}
        </div>
        <div>
          <Image
            src={"./arrowR.png"}
            width={56}
            height={56}
            onClick={slideRight}
            className="absolute right-10 z-10 hidden  rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block"
          ></Image>
        </div>
      </div>
    </>
  );
};

export default AboutRow;
