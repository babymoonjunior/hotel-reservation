"use client";

import React, { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ChangeDatePopUp from "./ChangeDatePopUp";
import PopUpwindows from "./PopUpWindows";

export default function BookingHistoryBTN({ receiveCancel, roomData, setBookingData, booking_id }) {
  const [showRoomPopUp, setShowRoomPopUp] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(true); //โชว์ปุ่ม cancel
  const router = useRouter();
  const checkInDate = new Date("Sun, 22 Oct 2023"); //วันเช็คอินตัวอย่าง
  const currentDate = new Date();
  const timeDifference = checkInDate - currentDate;
  const hoursDifference = timeDifference / (1000 * 3600);
  const [showChangeDateButton, setShowChangeDateButton] = useState(
    hoursDifference > 24
  );
  const [canRefund, setCanRefund] = useState(hoursDifference > 24);

  // console.log(hoursDifference);
  // console.log(showChangeDateButton);
  // console.log(canRefund);

  const showCancelPopUp = () => {
    setShowCancelModal(true);
    setIsPopUpVisible(true);
  };

  const showRoomDetailPopUp = () => {
    setShowRoomPopUp(true);
  };

  useEffect(() => {
    if (hoursDifference <= 24) {
      setShowChangeDateButton(false);
      setCanRefund(false);
    }
  }, [hoursDifference]);

  return (
    <div className="button-group flex flex-row justify-between pt-5 pb-10">
      {/* Cancel */}
      {/* {console.log(showCancelButton, isPopUpVisible)} */}
      {showCancelButton && isPopUpVisible ? (
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
        showCancelButton && (
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

      {showCancelButton && (
        <div className="right-btn-group">
          <Button
            variant="ghost"
            className="Room-Detail-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit mr-2"
            onClick={showRoomDetailPopUp}
          >
            Room Detail
          </Button>

          {showChangeDateButton && (
            <Button
              className="Change-Date-Btn text-base not-italic font-semibold leading-4 w-fit"
              onClick={() => router.push("/changedate")}
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
      {showRoomPopUp &&(<PopUpwindows roomData={roomData} modalOpen={showRoomPopUp} setModalOpen={setShowRoomPopUp}/>)}
    </div>
  );
}
