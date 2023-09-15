"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChangeDatePicker } from "./ChangeDatePicker";
import React, { useState } from "react";
import ChangeDatePopUp from "./ChangeDatePopUp";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function ChangeDate() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChangeDateModal, setShowChangeDateModal] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null); // เพิ่ม state สำหรับเก็บค่า date
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  let originalCheckIn = "Sun, 22 Oct 2023";
  let originalCheckOut = "Thu, 26 Oct 2023";
  let isCheckIn = false;
  let isCheckOut = false;

  // สร้างฟังก์ชันเพื่อรับค่า date จาก ChangeDatePicker component
  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };
  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  // สร้างฟังก์ชันเพื่อแสดง PopUp
  const showChangeDatePopUp = () => {
    setShowChangeDateModal(true);
    setIsPopUpVisible(true);
  };

  const showCancelPopUp = () => {
    setShowCancelModal(true);
    setIsPopUpVisible(false); //ตั้งค่าไม่โชว์ pop up ไว้
    router.push("/bookinghistory");
  };

  return (
    <section className="flex flex-col justify-start items-center px-[72px] max-w-[1440px] h-auto bg-[#F1F2F6]">
      <h1 className="w-[57%] font-mono text-[68px] font-medium leading-[125%] tracking-[-1.36px] self-start py-12">
        Change Check-in and Check-out Date
      </h1>
      <div className="history-card flex flex-col w-full border-b border-[#E4E6ED] ">
        <div className="image-booking-container flex flex-row pt-10">
          {/* ใส่รูป */}
          <div className="image-section w-full max-w-[357px] h-[210px] mr-10">
            <Image
              src="/superior-w453.png"
              alt="Superior"
              width={453}
              height={320}
              className="object-cover h-full"
            />
          </div>
          <div className="booking-details-section w-full">
            {/* room title */}
            <div className="title-container flex flex-row justify-between items-center w-full">
              <p className="room-title font-sans text-black text-[28px] font-semibold leading-[150%] tracking-[-0.56px]">
                Superior Garden View
              </p>
              <span className="text-[#9AA1B9] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                Booking date: Tue, 16 Oct 2022
              </span>
            </div>

            {/* Original Date */}
            <div className=" flex flex-row">
              <div className="mr-8 my-8">
                <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                  Original Date
                </p>
                <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                  {originalCheckIn} - {originalCheckOut}
                </span>
              </div>
            </div>

            {/* Change Date Calendar */}
            <div className="calendar-box flex flex-col justify-center bg-white p-3 rounded">
              <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                Change Date
              </p>
              <div className="flex flex-row justify-between mt-4">
                <div>
                  <span className="text-[#2A2E3F] font-sans text-base font-normal leading-[150%] py-3">
                    Check In :
                    <span className="text-white">
                      {" "}
                      {checkInDate
                        ? format(checkInDate, "EEE, dd MMM yyyy")
                        : "Pick a date"}
                    </span>
                  </span>
                  {/* เรียกใช้ ChangeDatePicker และส่งค่า checkInDate และ handleCheckInDateChange ไป */}
                  <ChangeDatePicker
                    isCheckIn={true}
                    date={checkInDate}
                    onDateChange={handleCheckInDateChange}
                    originalCheckIn={originalCheckIn} // เพิ่ม props สำหรับ originalCheckIn
                    originalCheckOut={originalCheckOut} // เพิ่ม props สำหรับ originalCheckOut
                  />
                </div>
                <div className="text-[#2A2E3F] flex justify-center items-center ">
                  -
                </div>
                <div>
                  <span className="text-[#2A2E3F] font-sans text-base font-normal leading-[150%] py-3">
                    Check Out :{" "}
                    <span className="text-white">
                      {" "}
                      {checkOutDate
                        ? format(checkOutDate, "EEE, dd MMM yyyy")
                        : "Pick a date"}
                    </span>
                  </span>
                  {/* เรียกใช้ ChangeDatePicker และส่งค่า checkOutDate และ handleCheckOutDateChange ไป */}
                  <ChangeDatePicker
                    isCheckOut={true}
                    date={checkOutDate}
                    onDateChange={handleCheckOutDateChange}
                    originalCheckIn={originalCheckIn} // เพิ่ม props สำหรับ originalCheckIn
                    originalCheckOut={originalCheckOut} // เพิ่ม props สำหรับ originalCheckOut
                  />
                </div>
              </div>
            </div>
            {/* End Change Date Calendar */}
          </div>
          {/* End booking-details-section */}
        </div>
        {/* End image-booking-container */}

        {/* button group */}
        <div className="button-group flex flex-row justify-between pt-5 pb-10">
          {isPopUpVisible ? (
            <div className="left-btn">
              <Button
                variant="ghost"
                className="Cancel-Booking-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit"
                disabled
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="left-btn">
              <Button
                variant="ghost"
                className="Cancel-Booking-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit"
                onClick={showCancelPopUp}
              >
                Cancel
              </Button>
            </div>
          )}

          {isPopUpVisible ? (
            <div className="right-btn-group">
              <Button
                className="Change-Date-Btn text-base not-italic font-semibold leading-4 w-fit"
                disabled
              >
                Confirm Change Date
              </Button>
            </div>
          ) : (
            <div className="right-btn-group">
              <Button
                className="Change-Date-Btn text-base not-italic font-semibold leading-4 w-fit"
                onClick={showChangeDatePopUp}
              >
                Confirm Change Date
              </Button>
            </div>
          )}
        </div>
        {/* End button group */}
      </div>
      {/* End history-card */}
      {isPopUpVisible && (
        <ChangeDatePopUp
          showCancelModal={showCancelModal}
          setShowCancelModal={setShowCancelModal}
          showChangeDateModal={showChangeDateModal}
          setShowChangeDateModal={setShowChangeDateModal}
          isPopUpVisible={isPopUpVisible}
          setIsPopUpVisible={setIsPopUpVisible}
        />
      )}
    </section>
  );
}
