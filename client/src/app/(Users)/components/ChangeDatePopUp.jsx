"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function ChangeDatePopUp(props) {
  const {
    showCancelModal,
    setShowCancelModal,
    showChangeDateModal,
    setShowChangeDateModal,
    isPopUpVisible,
    setIsPopUpVisible,
    canRefund,
    setCanRefund,
    showCancelButton,
    setShowCancelButton,
    receiveCancel,
    booking_id, //ต้อง cancel มาจากหน้า BookingHistory ก่อน ถึงจะมีค่า
    newCheckInDate,
    newCheckOutDate,
    nightValue,
  } = props;

  let title = "";
  let questionText = "";
  let leftButtonText = "";
  let rightButtonText = "";
  let cancelDate = "Mon, 16 Oct 2023";
  let message = ""; //Status of cancel :refunded, cancelled without refund.

  if (showChangeDateModal) {
    title = "Change Date";
    questionText =
      "Are you sure you want to change your check-in and check-out date?";
    leftButtonText = "No, I don’t";
    rightButtonText = "Yes, I want to change";
  } else if (showCancelModal) {
    if (canRefund) {
      title = "Cancel Booking";
      questionText =
        "Are you sure you want to cancel this booking and request a refund?";
      leftButtonText = "No, Don’t Cancel";
      rightButtonText = "Yes, I want to cancel and request refund";
      message = "refunded";
    } else {
      title = "Cancel Booking";
      questionText =
        "Cancellation of the booking now will not be able to request a refund. Are you sure you would like to cancel this booking?";
      leftButtonText = "No, Don’t Cancel";
      rightButtonText = "Yes, I want to cancel without refund";
      message = "cancelled without refund";
    }
  }

  //เก็บค่า bookingID จาก URL
  const bookingIdParams = useSearchParams();
  const bookingID = bookingIdParams.get("booking_id");
  // console.log(bookingID);

  //ใช้ที่หน้า BookingHistory
  const handleCancel = async () => {
    try {
      const result = await axios.put(
        `http://localhost:4000/history/cancellation/${booking_id}`,
        { payment_status: message }
      );
      setIsPopUpVisible(false);
      receiveCancel(cancelDate, booking_id, canRefund);
      window.location.reload(); // Reload หน้าเว็บ
    } catch (error) {
      console.log(error);
    }
  };

  //ใช้ที่หน้า ChangeDate
  const handleChangeDate = async () => {
    try {
      const result = await axios.put(
        `http://localhost:4000/history/updated-date/`,
        {
          checkin_date: newCheckInDate,
          checkout_date: newCheckOutDate,
          room_type_id,
          quantity: nightValue,
          booking_id,
        }
      );
      setIsPopUpVisible(false);
      window.location.reload(); // Reload หน้าเว็บ
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="popup bg-white max-w-[550px] w-full font-sans drop-shadow-xl z-50 absolute left-[50%] -bottom-[5%]"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex flex-row justify-between items-center border-b border-[#E4E6ED] px-4 py-2">
          <span className="modal-titile text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            {title}
          </span>
          <button
            className="text-[#C8CCDB]"
            onClick={() => {
              if (showChangeDateModal) {
                setIsPopUpVisible(false); // ปิด PopUp สำหรับ Change Date
                setShowChangeDateModal(false);
              } else if (showCancelModal) {
                setIsPopUpVisible(false); // ปิด PopUp สำหรับ Cancel
                setShowCancelModal(false);
              }
            }}
          >
            X
          </button>
        </div>
        <div className="p-4">
          <p className="modal-question text-[#646D89] text-base font-normal leading-[150%] tracking-[-0.32px] pb-4">
            {questionText}
          </p>
          <div className="flex flex-row justify-end">
            <Button
              variant="secondary"
              className="mr-3 left-button w-fit"
              onClick={() => {
                if (showChangeDateModal) {
                  setIsPopUpVisible(false); // ปิด PopUp สำหรับ Change Date
                  setShowChangeDateModal(false);
                } else if (showCancelModal) {
                  setIsPopUpVisible(false); // ปิด PopUp สำหรับ Cancel
                  setShowCancelModal(false);
                }
              }}
            >
              {leftButtonText}
            </Button>
            <Button
              id={booking_id}
              className="right-button w-fit"
              onClick={() => {
                if (title === "Cancel Booking") {
                  handleCancel();
                } else if (title === "Change Date") {
                  //จัดการอัพเดทวันเช็คอินเอ้าท์ใหม่
                  handleChangeDate();
                }
              }}
            >
              {rightButtonText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
