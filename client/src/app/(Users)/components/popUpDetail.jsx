"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Button, buttonVariants } from "@/components/ui/button";

const PopUpdetail = () => {
  const slides = [
    { url: "/SuperiorGardenView.png" },
    { url: "/Deluxe.png" },
    { url: "/Superior.png" },
    { url: "/Supreme.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* Button to open the modal */}

      <section className="flex justify-center ">
        <div className="flex flex-col w-[800px]  justify-center items-center  ">
          {/* ... Your existing code ... */}
          <div className="flex w-[800px] h-[800px] bg-red-200    ">
            พื้นที่ ผลลัพธ์ search
            <Button
              className={`${buttonVariants({
                variant: "primary",
              })} text-orange-300 w-[50px] h-[50px] mt-20`}
              onClick={openModal}
            >
              Room detail
            </Button>
          </div>
          {/* Modal */}
          <div
            id="myModal"
            className={`modal ${modalOpen ? "block" : "hidden"} absolute z-10`}
          >
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
                      <div className="text-[20px] font-semibold ml-[80px] ">
                        Superior Garden View
                      </div>
                      <div className="w-[60px] h-[60px] cursor-pointer">
                        <Image
                          src={"/exit.svg"}
                          width={60}
                          height={60}
                          alt="Exit"
                          onClick={closeModal}
                        />
                      </div>
                    </div>
                    <section className="flex flex-col items-center  w-[800px] h-[517px] overflow-y-auto   justify-center  ">
                      <section className="flex flex-col items-center    ">
                        <div className="flex flex-col justify-end  h-[650px] w-[640px]  relative group  ">
                          <div
                            style={{
                              backgroundImage: `url(${slides[currentIndex].url})`,
                            }}
                            className="w-[640px] h-[400px] bg-center bg-cover duration-500 rounded-[4px] relative"
                          >
                            {/* Left arrow */}
                            <div className="hidden group-hover:block absolute  top-1/2 -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                              <BsChevronCompactLeft
                                onClick={prevSlide}
                                size={30}
                              />
                            </div>
                            {/* Right arrow */}
                            <div className="hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                              <BsChevronCompactRight
                                onClick={nextSlide}
                                size={30}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className="flex gap-4 mt-[37px] ">
                              <div>
                                <span className="text-[#646D89]">Person</span>
                              </div>
                              <div>
                                <span className="text-[#646D89]">
                                  Double bed
                                </span>
                              </div>
                              <div>
                                <span className="text-[#646D89]">sqm</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-[16px] mb-[40px]  ">
                            <p className="text-[#646D89]">
                              Rooms (36sqm) with full garden views, 1 single
                              bed, bathroom with bathtub & shower.
                            </p>
                          </div>
                          <hr />
                          <div>
                            <div className="flex flex-col gap-[22px]  justify-between   ">
                              <h2>Room Amenities</h2>
                              <ul className="list-disc grid grid-cols-2 gap-x-6 pl-5 text-[#646D89]">
                                <li>Safe in Room</li>
                                <li>Air Conditioning</li>
                                <li>High speed internet connection</li>
                                <li>Hairdryer</li>
                                <li>Shower</li>
                                <li>Shower</li>
                                <li>Minibar</li>
                                <li>Telephone</li>
                                <li>Ironing board</li>
                                <li>
                                  A floor only accessible via a guest room key
                                </li>
                                <li>Alarm clock</li>
                                <li>Bathrobe</li>
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
        </div>
      </section>
    </>
  );
};

export default PopUpdetail;
