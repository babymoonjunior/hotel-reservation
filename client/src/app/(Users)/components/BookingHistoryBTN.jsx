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
  checkinStatus,
  payment_method,
  setMessageModalOpen,
  setMessageAlert,
}) {
  const [showRoomPopUp, setShowRoomPopUp] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(true); //โชว์ปุ่ม cancel
  const router = useRouter();

  //คำนวณหาส่วนต่างของเวลาปัจจุบันกับวันเช็คอิน
  const newCheckInDate = new Date(checkinDate); //แปลงค่าวันเช็คอิน
  const currentDate = new Date();
  const timeDifference = newCheckInDate - currentDate;
  const hoursDifference = timeDifference / (1000 * 3600);
  const [showChangeDateButton, setShowChangeDateButton] = useState(
    hoursDifference > 24
  );
  const [canRefund, setCanRefund] = useState(hoursDifference > 24);
  let enableCheckIn;

  //เช็ควันปัจจุบันเลยวันเช็คอินมาหรือยัง

  if (currentDate > newCheckInDate || checkinStatus === true) {
    enableCheckIn = false;
  } else {
    enableCheckIn = true;
  }

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
      router.push(`/changedate?booking_id=${booking_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row justify-between pt-5 pb-10 button-group">
      {/* Cancel */}
      {enableCheckIn &&
      (paymentStatus !== "refunded" ||
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
        !(
          paymentStatus === "refunded" ||
          paymentStatus === "cancelled without refund"
        ) && (
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

      {enableCheckIn &&
        !(
          paymentStatus === "refunded" ||
          paymentStatus === "cancelled without refund"
        ) && (
          <div className="right-btn-group">
            <Button
              variant="ghost"
              className="Room-Detail-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit mr-2"
              onClick={showRoomDetailPopUp}
            >
              Room Detail
            </Button>

            {enableCheckIn &&
              !(
                paymentStatus === "refunded" ||
                paymentStatus === "cancelled without refund"
              ) &&
              showChangeDateButton && (
                <Button
                  className="text-base not-italic font-semibold leading-4 Change-Date-Btn w-fit"
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
          payment_method={payment_method}
          setMessageModalOpen={setMessageModalOpen}
          setMessageAlert={setMessageAlert}
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
