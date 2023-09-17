"use client";

import React, { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ChangeDatePopUp from "./ChangeDatePopUp";
import PopUpwindows from "./PopUpWindows";

export default function BookingHistoryBTN({
  receiveCancel,
  roomData,
  setBookingData,
  booking_id,
  paymentStatus,
  checkinDate,
  checkoutDate,
  checkinStatus
}) {
  const [showRoomPopUp, setShowRoomPopUp] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(true); //โชว์ปุ่ม cancel
  const router = useRouter();

  //คำนวณหาส่วนต่างของเวลาปัจจุบันกับวันเช็คอิน
  const newCheckInDate = new Date(checkinDate); //แปลงค่าวันเช็คอิน
  // console.log(checkinDate, newCheckInDate);
  const currentDate = new Date();
  const timeDifference = newCheckInDate - currentDate;
  const hoursDifference = timeDifference / (1000 * 3600);
  const [showChangeDateButton, setShowChangeDateButton] = useState(
    hoursDifference > 24
  );
  const [canRefund, setCanRefund] = useState(hoursDifference > 24);
  // const [enableCheckIn, setEnableCheckIn] = useState();
  let enableCheckIn;

  //เช็ควันปัจจุบันเลยวันเช็คอินมาหรือยัง
  
    if ((currentDate > newCheckInDate) || (checkinStatus === true)) {
      enableCheckIn = false;
      // console.log("เลยวันเช็คอิน หรือ ห้องนี้เช็คอินเรียบร้อย = ซ่อนปุ่มกด",currentDate,newCheckInDate);
    } else {
      enableCheckIn = true;
      // console.log("วันปัจจุบันยังไม่เลยวันเช็คอิน หรือ ยังไม่ได้เช็คอิน",currentDate,newCheckInDate);
    }
 
  

  // console.log(hoursDifference);
  // console.log(showChangeDateButton);
  // console.log(canRefund);

  //โชว์ cancel pop up
  const showCancelPopUp = () => {
    setShowCancelModal(true);
    setIsPopUpVisible(true);
  };

  //โชว์ room detail pop up
  const showRoomDetailPopUp = () => {
    setShowRoomPopUp(true);
  };

  useEffect(() => {
    if (hoursDifference <= 24) {
      setShowChangeDateButton(false);
      setCanRefund(false);
    }
  }, [hoursDifference]);

  const handleChangeDate = () => {
    try {
      router.push(`/changedate?booking_id=${booking_id}`)
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="button-group flex flex-row justify-between pt-5 pb-10">
      {/* Cancel */}
      {/* {console.log(showCancelButton, isPopUpVisible)} */}
      {enableCheckIn && (paymentStatus !== "refunded" ||
        paymentStatus !== "cancelled without refund") &&
      isPopUpVisible ? (
        <div className="left-btn">
          <Button
            variant="ghost"
            className="Cancel-Booking-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit"
            disabled
          >
            Cancel Booking
          </Button>
        </div>
      ) : (
        enableCheckIn &&
        !(paymentStatus === "refunded" ||
          paymentStatus === "cancelled without refund") && (
          <div className="left-btn">
            <Button
              variant="ghost"
              className="Cancel-Booking-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit"
              onClick={showCancelPopUp}
            >
              Cancel Booking
            </Button>
          </div>
        )
      )}

      {enableCheckIn && !(paymentStatus === "refunded" ||
        paymentStatus === "cancelled without refund") && (
        <div className="right-btn-group">
          <Button
            variant="ghost"
            className="Room-Detail-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit mr-2"
            onClick={showRoomDetailPopUp}
          >
            Room Detail
          </Button>

          {enableCheckIn && !(paymentStatus === "refunded" ||
            paymentStatus === "cancelled without refund") &&
            showChangeDateButton && (
              <Button
                className="Change-Date-Btn text-base not-italic font-semibold leading-4 w-fit"
                onClick={handleChangeDate}
              >
                Change Date
              </Button>
            )}
        </div>
      )}
      {/* End history-card */}
      {isPopUpVisible && (
        <ChangeDatePopUp
          showCancelModal={showCancelModal}
          setShowCancelModal={setShowCancelModal}
          isPopUpVisible={isPopUpVisible}
          setIsPopUpVisible={setIsPopUpVisible}
          canRefund={canRefund}
          setCanRefund={setCanRefund}
          showCancelButton={showCancelButton}
          setShowCancelButton={setShowCancelButton}
          receiveCancel={receiveCancel}
          booking_id={booking_id}
        />
      )}
      {showRoomPopUp && (
        <PopUpwindows
          roomData={roomData}
          modalOpen={showRoomPopUp}
          setModalOpen={setShowRoomPopUp}
        />
      
      )}
    </div>
  );
}
