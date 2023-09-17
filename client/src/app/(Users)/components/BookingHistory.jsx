"use client";

import Image from "next/image";
import BookingAccordion from "./BookingAccordion";
import BookingHistoryBTN from "./BookingHistoryBTN";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import useDateAndCurrencyHook from "@/hook/useDateAndCurrencyHook";

export default function BookingHistory() {
  const [showCancelDate, setShowCancelDate] = useState(false);
  const [cancelDate, setCancelDate] = useState("");
  const [cancelBookingID, setCancelBookingID] = useState("");
  const [bookingData, setBookingData] = useState([]);
  const [cancelData, setCancelData] = useState([]);

  const { convertDate, formatNumberWithCommasAndTwoDecimals, convertPrice } =
    useDateAndCurrencyHook();

  const getBookingHistory = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/history/b5b23146-339a-4be9-9e6c-7c2b320b4d84`
      );
      setBookingData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookingHistory();
  }, []);

  // useEffect(() => {
  //   cancelBooking();
  // }, []);

  // useEffect(()=>{
  //   console.log(bookingData[0].booking_id);
  // })

  // useEffect(() => {
  //   if (bookingData && bookingData.length > 0) {
  //     console.log(bookingData[0].room_image[0]);
  //     console.log(bookingData[0].main_image);
  //   }
  // }, []);

  // สร้างฟังก์ชันเพื่อรับวันที่ยกเลิก จาก ChangeDatePopUp component
  const receiveCancel = (cancelDate, booking_id, canRefund) => {
    if (cancelDate !== "") {
      setShowCancelDate(true);
      setCancelDate(cancelDate);
      setCancelBookingID(booking_id);
    }
    console.log(cancelDate);
    console.log(booking_id);
  };

  return (
    <section className="flex flex-col justify-center items-center px-[72px] max-w-[1440px] h-auto bg-[#F1F2F6]">
      <h1 className="font-mono text-[68px] font-medium leading-[125%] tracking-[-1.36px]  self-start py-16">
        Booking History
      </h1>
      {bookingData.map((bookingData, index) => (
        <div
          key={index}
          className="history-card flex flex-col w-full border-b border-[#E4E6ED] relative "
        >
          <div className="image-booking-container flex flex-row pt-10">
            {/* ใส่รูป */}
            <div className="image-section w-full max-w-[357px] h-[210px] mr-10">
              <Image
                src={bookingData.main_image}
                alt={bookingData.roomtypetitle}
                width={453}
                height={320}
                className="object-cover h-full"
              />
              <div className="text-[#F1F2F6]">{bookingData.booking_id}</div>
            </div>
            <div className="booking-details-section w-full">
              {/* room title */}
              <div className="title-container flex flex-row justify-between items-center w-full">
                <p className="room-title font-sans text-black text-[28px] font-semibold leading-[150%] tracking-[-0.56px]">
                  {bookingData.roomtypetitle}
                </p>
                {/* Booking & Cancellation Date */}
                <span className="text-[#9AA1B9] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                  <div>
                  
                    Booking date: {format(new Date(bookingData.created_at), "EEE, dd MMM yyyy")}{" "}
                  </div>
                  {/* {console.log(showCancelDate)} */}
                  {(bookingData.payment_status === "refunded" ||
                    bookingData.payment_status ===
                      "cancelled without refund") && (
                    <div>
                      Cancellation date: {format(new Date(bookingData.updated_at), "EEE, dd MMM yyyy")}
                    </div>
                  )}
                </span>
              </div>

              {/* check-in-out-table */}
              <div className="check-in-out-container flex flex-row">
                <div className="check-in-box mr-8 my-8">
                  <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                    Check-in
                  </p>
                  <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                    {format(new Date(bookingData.checkin_date), "EEE, dd MMM yyyy")} | After 2:00 PM
                  </span>
                </div>
                <div className="check-out-box my-8">
                  <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                    Check-out
                  </p>
                  <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                    {format(new Date(bookingData.checkout_date), "EEE, dd MMM yyyy")}| Before 12:00 PM
                  </span>
                </div>
              </div>

              {/* booking detail accordion */}
              <BookingAccordion
                guests={bookingData.guests}
                night={bookingData.night}
                payment_method={bookingData.payment_method}
                roomtypetitle={bookingData.roomtypetitle}
                fullprice={bookingData.fullprice}
                special_request={bookingData.special_request}
                promotion={bookingData.promotion}
                total_price={bookingData.total_price}
                additional={bookingData.additional}
                discountprice={bookingData.discountprice}
              />
            </div>
            {/* End booking-details-section */}
          </div>
          {/* End image-booking-container */}

          {/* button group */}
          <BookingHistoryBTN
            receiveCancel={receiveCancel}
            roomData={bookingData}
            setBookingData={setBookingData}
            booking_id={bookingData.booking_id}
            paymentStatus={bookingData.payment_status}
            checkinDate={format(new Date(bookingData.checkin_date), "EEE, dd MMM yyyy")}
            checkoutDate={format(new Date(bookingData.checkout_date), "EEE, dd MMM yyyy")}
            checkinStatus={bookingData.checkin_status}
          />
        </div>
      ))}
      {/* End history-card */}
    </section>
  );
}
// {bookingData.length > 0 && convertDate(bookingData[0].created_at)}
// {bookingData.is_cancel && <div>Cancellation date: {bookingData.cancel_date}</div>}
