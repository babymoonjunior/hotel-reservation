"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import getRoomDetail from "@/lib/getRoomDetail";

export default function ImageSlide({ params }) {
  const [roomImage, setRoomImage] = useState([]);
  console.log("params", params);
  const getData = async () => {
    try {
      const res = await getRoomDetail(params.slug);
      console.log("res", res.data);
      setRoomImage(res.data.room_image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  // function กดเลื่อนรูปซ้ายขวา
  const prevSlide = () => {
    // console.log(currentIndex);
    const isFirstSlide = currentIndex === 0;
    // console.log(isFirstSlide);
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
    <div className="fixed flex w-full mx-auto overflow-hidden max-w-7xl bg-black z-[100] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
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
          priority
        />
        <Image
          src={roomImage[currentIndex]}
          alt={`image`}
          className="object-cover w-full transition-opacity duration-500 h-96"
          width={300}
          height={300}
          priority
        />
        {/* เพิ่มไข่ปลาเลื่อนรูป */}
        <div className="flex justify-center items-center py-2 absolute bottom-0 left-[40%]">
          {roomImage.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer opacity-30 hover:opacity-100"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>

        <div className="absolute z-20 w-full transition-opacity duration-500 translate-x-1/2 bg-black opacity-50 h-96 left-80"></div>
        <Image
          src={roomImage[(currentIndex + 1) % roomImage.length]}
          alt={`image`}
          className="absolute object-cover w-full transition-opacity duration-500 translate-x-1/2 left-80 h-96"
          width={300}
          height={300}
          priority
        />
      </div>

      {/* ใส่ปุ่มเลื่อนรูปซ้ายขวา */}
      <div className="absolute z-30 p-2 text-2xl text-white -translate-y-1/2 rounded-full cursor-pointer top-1/2 left-64 bg-black/20">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="absolute z-30 p-2 text-2xl text-white -translate-y-1/2 rounded-full cursor-pointer top-1/2 right-64 bg-black/20">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
    </div>
  );
}
