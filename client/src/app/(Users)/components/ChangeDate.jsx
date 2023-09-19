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
      if (!currentUser.data.session) {
        router.push("/login");
        return;
        }
      const profileId = currentUser.data.session.user.id;
      // console.log(profileId);

      const result = await axios.get(
        `http://localhost:4000/history/changedate/${bookingID}`
      );
      setBookingDetail(result.data.data);
      // console.log(result.data.data.booking_id);
      if (result.data.data && result.data.data.length > 0) {
        const night = result.data.data.map(item => item.night);
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
    if(result === nightValue){
      console.log(`คุณเลือกจำนวนคืนได้ถูกต้อง ${result} คืน`);
    }else{
      console.log(`สามารถเลือกจำนวนคืนได้ ${nightValue} เท่านั้น`);
      window.alert(`สามารถเลือกจำนวนคืนได้ ${nightValue} เท่านั้น`);
    }
  }
  }, [checkInDate, checkOutDate]);


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
    <section className="flex flex-col justify-start items-center px-[72px] max-w-[1440px] h-auto bg-[#F1F2F6]">
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
            <div className="image-booking-container flex flex-row pt-10">
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
              <div className="booking-details-section w-full">
                {/* room title */}
                <div className="title-container flex flex-row justify-between items-center w-full">
                  <p className="room-title font-sans text-black text-[28px] font-semibold leading-[150%] tracking-[-0.56px]">
                    {booking.roomtypetitle}
                  </p>
                  <span className="text-[#9AA1B9] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                    Booking date:{" "}
                    {format(new Date(booking.created_at), "EEE, dd MMM yyyy")}
                  </span>
                </div>

                {/* Original Date */}
                <div className=" flex flex-row">
                  <div className="mr-8 my-8">
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
                <div className="calendar-box flex flex-col justify-center bg-white p-3 rounded">
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
                            : format(new Date(booking.checkin_date),"EEE, dd MMM yyyy")}
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
                            : format(new Date(booking.checkout_date),"EEE, dd MMM yyyy")}
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
          />
        </>
      )}
    </section>
  );
}
