"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

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
    booking_id,
  } = props;

  // let changeDate = false; // สมมติว่ามีการกดปุ่ม change date
  // let cancel = true; // สมมติว่ามีการกดปุ่ม cancel
  // let refund = true; // สมมติว่าขอคืนเงินได้

  let title = "";
  let questionText = "";
  let leftButtonText = "";
  let rightButtonText = "";
  let cancelDate = "Mon, 16 Oct 2023";

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
    } else {
      title = "Cancel Booking";
      questionText =
        "Cancellation of the booking now will not be able to request a refund. Are you sure you would like to cancel this booking?";
      leftButtonText = "No, Don’t Cancel";
      rightButtonText = "Yes, I want to cancel without refund";
    }
  }

  return (
    <>
      <div
        className="popup bg-white max-w-[550px] w-full font-sans drop-shadow-xl z-50 absolute left-[50%] -bottom-[15%]"
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
              className="left-button w-fit mr-3"
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
              onClick={ (event) => {
                if (title === "Cancel Booking") {
                   setShowCancelButton(false);
                  setIsPopUpVisible(false);
                  //ส่ง canRefund
                  const buttonId = event.currentTarget.id;
                  console.log(event.currentTarget.id);
                  receiveCancel(cancelDate, booking_id, buttonId);
                  //จัดการลบข้อมูลออก
                } else if (title === "Change Date") {
                  //จัดการอัพเดทวันเช็คอินเอ้าท์ใหม่
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
