"use client";
import React, { useState } from "react";
import { useAuth } from "../context/context.jsx";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Image from "next/image";

const PopUpwindows = ({ roomData, setModalOpen, modalOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex =
      (currentIndex - 1 + roomData.room_image.length) %
      roomData.room_image.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % roomData.room_image.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div id="myModal" className="absolute z-10   mr-72">
      <div className="modal-content bg-white p-4 rounded-lg shadow-lg">
        {/* Close button (X) */}
        {/* <span className="close absolute top-0 right-0 p-4 cursor-pointer">
                &times;
              </span> */}
        <section>
          {/* Content to display inside the modal */}
          <section className="flex justify-center">
            <div className="flex flex-col w-[800px] justify-center items-center  ">
              <div className="flex w-full  h-[60px] pl-0 justify-between items-center gap-[22px]   ">
                <div className="text-[20px] font-semibold ml-[80px]  ">
                  {roomData.roomTypeTitle}
                </div>
                <div
                  onClick={() => setModalOpen(false)} // Use the setModalOpen prop to close the modal
                  className="w-[60px] h-[60px] cursor-pointer"
                >
                  <Image src={"/exit.svg"} width={60} height={60} alt="Exit" />
                </div>
              </div>
              <section className="flex flex-col items-center  w-[800px] h-[517px] overflow-y-auto   justify-center  ">
                <section className="flex flex-col items-center w-[700px]  h-[517px]    ">
                  <div className="flex flex-col justify-end h-[650px] w-[640px]  relative group  ">
                    <div
                      style={{
                        backgroundImage: `url(${roomData.room_image[currentIndex]})`,
                      }}
                      className="w-[640px] h-[400px] bg-center bg-cover duration-500 rounded-[4px] relative"
                    >
                      {/* Left arrow */}
                      <div className="hidden group-hover:block absolute  top-1/2 -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                        <BsChevronCompactLeft onClick={prevSlide} size={30} />
                      </div>
                      {/* Right arrow */}
                      <div className="hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                        <BsChevronCompactRight onClick={nextSlide} size={30} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="flex gap-4 mt-[37px] ">
                        <div>
                          <span className="text-[#646D89]">
                            {roomData.guests} Person
                          </span>
                        </div>
                        <div>
                          <span className="text-[#646D89]">
                            {roomData.bedtype} Double bed
                          </span>
                        </div>
                        <div>
                          <span className="text-[#646D89]">
                            {roomData.roomarea} sqm
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[16px] mb-[40px]  ">
                      <p className="text-[#646D89]">{roomData.description}</p>
                    </div>
                    <hr />
                    <div>
                      <div className="flex flex-col gap-[22px]  justify-between   ">
                        <h2>Room Amenities</h2>
                        <ul className="list-disc grid grid-cols-2 gap-x-6 pl-5 text-[#646D89]">
                          {roomData.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default PopUpwindows;
