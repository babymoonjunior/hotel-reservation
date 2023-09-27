"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import ChangeDatePopUp from "./ChangeDatePopUp";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { differenceInDays } from "date-fns";
import { ChangeCheckInDatePicker } from "./ChangeCheckInDatePicker";
import { ChangeCheckOutDatePicker } from "./ChangeCheckOutDatePicker";
import ModalMessage from "./ModalMessage";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ChangeDate() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChangeDateModal, setShowChangeDateModal] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingDetail, setBookingDetail] = useState([]);
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [nightValue, setNightValue] = useState(0);
  // ใส่ Disabled Button // Nu
  const [disabledButton, setDisabledButton] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const supabase = createClientComponentClient();

  // ใช้ "Asia/Bangkok" โซนเวลา "เวลาอินโดจีน"
  const timeZone = "Asia/Bangkok";

  //เก็บค่า bookingID จาก URL
  const bookingIdParams = useSearchParams();
  const bookingID = bookingIdParams.get("booking_id");
  // console.log(bookingID);

  const getChangeDateDetail = async () => {
    try {
      const currentUser = await supabase.auth.getSession();
      // if (!currentUser.data.session) {
      //   router.push("/login");
      //   return;
      // }
      const profileId = currentUser.data.session.user.id;
      // console.log(profileId);

      const result = await axios.get(
        `http://localhost:4000/history/changedate/${bookingID}`
      );
      setBookingDetail(result.data.data);
      // console.log(result.data.data.booking_id);
      if (result.data.data && result.data.data.length > 0) {
        const night = result.data.data.map((item) => item.night);
        // console.log(Number(night[0]));
        setNightValue(Number(night[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChangeDateDetail();
  }, []);

  // สร้างฟังก์ชันเพื่อรับค่า date จาก ChangeDatePicker component
  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    setIsCheckIn(true);
    setIsCheckOut(false);
  };
  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    setIsCheckIn(false);
    setIsCheckOut(true);
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const result = differenceInDays(checkOutDate, checkInDate);
      console.log(result);

      if (result === nightValue) {
        console.log(`คุณเลือกจำนวนคืนได้ถูกต้อง ${result} คืน`);
        setDisabledButton(false);
      } else {
        console.log(`สามารถเลือกจำนวนคืนได้ ${nightValue} เท่านั้น`);
        window.alert(`สามารถเลือกจำนวนคืนได้ ${nightValue} เท่านั้น`);
        setDisabledButton(true);
      }
    }
  }, [checkInDate, checkOutDate, nightValue]);

  // ฟังก์ชันแสดง PopUp
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
    <section className="w-full bg-[#F1F2F6]">
      <article className="flex flex-col justify-start items-center px-[72px] max-w-[1440px] mx-auto w-full h-auto ">
        <h1 className="w-[57%] font-mono text-[68px] font-medium leading-[125%] tracking-[-1.36px] self-start py-12">
          Change Check-in and Check-out Date
        </h1>
        {bookingDetail &&
          Array.isArray(bookingDetail) &&
          bookingDetail.length > 0 &&
          bookingDetail.map((booking, index) => (
            <div
              key={index}
              className="history-card flex flex-col w-full border-b border-[#E4E6ED] relative"
            >
              <div className="flex flex-row pt-10 image-booking-container">
                {/* ใส่รูป */}
                <div className="image-section w-full max-w-[357px] h-[210px] mr-10">
                  <Image
                    src={booking.main_image}
                    alt={booking.roomtypetitle}
                    width={453}
                    height={320}
                    className="object-cover h-full"
                  />
                </div>
                <div className="w-full booking-details-section">
                  {/* room title */}
                  <div className="flex flex-row items-center justify-between w-full title-container">
                    <p className="room-title font-sans text-black text-[28px] font-semibold leading-[150%] tracking-[-0.56px]">
                      {booking.roomtypetitle}
                    </p>
                    <span className="text-[#9AA1B9] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                      Booking date:{" "}
                      {format(new Date(booking.created_at), "EEE, dd MMM yyyy")}
                    </span>
                  </div>

                  {/* Original Date */}
                  <div className="flex flex-row ">
                    <div className="my-8 mr-8">
                      <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                        Original Date
                      </p>
                      <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                        {format(
                          new Date(booking.checkin_date),
                          "EEE, dd MMM yyyy"
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(booking.checkout_date),
                          "EEE, dd MMM yyyy"
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Change Date Calendar */}
                  <div className="flex flex-col justify-center p-3 bg-white rounded calendar-box">
                    <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                      Change Date
                    </p>
                    <div className="flex flex-row justify-between mt-4">
                      <div>
                        <span className="text-[#2A2E3F] font-sans text-base font-normal leading-[150%] py-3">
                          Check In :
                          <span className="text-black">
                            {" "}
                            {checkInDate
                              ? format(checkInDate, "EEE, dd MMM yyyy")
                              : format(
                                  new Date(booking.checkin_date),
                                  "EEE, dd MMM yyyy"
                                )}
                          </span>
                        </span>
                        {/* เรียกใช้ ChangeDatePicker และส่งค่า checkInDate และ handleCheckInDateChange ไป */}
                        {/* {console.log(checkInDate)} */}
                        <ChangeCheckInDatePicker
                          isCheckIn={isCheckIn}
                          isCheckOut={isCheckOut}
                          date={booking.checkin_date}
                          onDateChange={handleCheckInDateChange}
                          originalCheckIn={booking.checkin_date} // เพิ่ม props สำหรับ originalCheckIn
                          originalCheckOut={booking.checkout_date} // เพิ่ม props สำหรับ originalCheckOut
                        />
                      </div>
                      <div className="text-[#2A2E3F] flex justify-center items-center ">
                        -
                      </div>
                      <div>
                        <span className="text-[#2A2E3F] font-sans text-base font-normal leading-[150%] py-3">
                          Check Out :{" "}
                          <span className="text-black">
                            {" "}
                            {checkOutDate
                              ? format(checkOutDate, "EEE, dd MMM yyyy")
                              : format(
                                  new Date(booking.checkout_date),
                                  "EEE, dd MMM yyyy"
                                )}
                          </span>
                        </span>
                        {/* เรียกใช้ ChangeDatePicker และส่งค่า checkOutDate และ handleCheckOutDateChange ไป */}
                        {/* {console.log(checkOutDate)} */}
                        <ChangeCheckOutDatePicker
                          isCheckIn={isCheckIn}
                          isCheckOut={isCheckOut}
                          date={booking.checkout_date}
                          onDateChange={handleCheckOutDateChange}
                          originalCheckIn={booking.checkin_date} // เพิ่ม props สำหรับ originalCheckIn
                          originalCheckOut={booking.checkout_date} // เพิ่ม props สำหรับ originalCheckOut
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
              <div className="flex flex-row justify-between pt-5 pb-10 button-group">
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
                      Back to Booking History
                    </Button>
                  </div>
                )}

                {isPopUpVisible ? (
                  <div className="right-btn-group">
                    <Button
                      className="text-base not-italic font-semibold leading-4 Change-Date-Btn w-fit"
                      disabled
                    >
                      Confirm Change Date
                    </Button>
                  </div>
                ) : (
                  <div className="right-btn-group">
                    <Button
                      className="text-base not-italic font-semibold leading-4 Change-Date-Btn w-fit"
                      onClick={showChangeDatePopUp}
                      disabled={disabledButton}
                    >
                      Confirm Change Date
                    </Button>
                  </div>
                )}
              </div>
              {/* End button group */}
            </div>
          ))}
        {/* End history-card */}
        {isPopUpVisible && (
          <>
            <ChangeDatePopUp
              showCancelModal={showCancelModal}
              setShowCancelModal={setShowCancelModal}
              showChangeDateModal={showChangeDateModal}
              setShowChangeDateModal={setShowChangeDateModal}
              isPopUpVisible={isPopUpVisible}
              setIsPopUpVisible={setIsPopUpVisible}
              newCheckInDate={checkInDate}
              newCheckOutDate={checkOutDate}
              nightValue={nightValue}
              room_type_id={bookingDetail[0].room_type_id}
              setMessageModalOpen={setMessageModalOpen}
              setMessageAlert={setMessageAlert}
            />
          </>
        )}
        <div>
          <ModalMessage
            open={messageModalOpen}
            setOpen={setMessageModalOpen}
            message={messageAlert}
          />
        </div>
      </article>
    </section>
  );
}
