"use client";
import React, { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { AuthProvider, useAuth } from "../context/context.jsx"; // Adjust the import path as needed
import PopUpwindows from "./popUpwindows.jsx";

const PopUpdetail = () => {
  const { currentIndex, setCurrentIndex, modalOpen, setModalOpen } = useAuth();
  console.log(modalOpen);

  // Function to open the modal
  const openModal = () => {
    setModalOpen((prev) => {
      return !prev;
    });
  };

  // Function to close the modal

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
        </div>
        {openModal && <PopUpwindows />}
      </section>
    </>
  );
};

export default PopUpdetail;
