"use client";

import Image from "next/image";
import BookingAccordion from "./BookingAccordion";
import BookingHistoryBTN from "./BookingHistoryBTN";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useBookingHook from "@/hook/useBookingHook";

export default function BookingHistory() {
  const [showCancelDate, setShowCancelDate] = useState(false);
  const [cancelDate, setCancelDate] = useState("");
  const [cancelBookingID, setCancelBookingID] = useState("");
  const [bookingData, setBookingData] = useState([]);

  const convertDate = (dateInput) => {
    var date = new Date(dateInput);
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayOfWeek = dayNames[date.getUTCDay()];
    var dayOfMonth = date.getUTCDate();
    var month = monthNames[date.getUTCMonth()];
    var year = date.getUTCFullYear();
    var formattedDate =
      dayOfWeek + ", " + dayOfMonth + " " + month + " " + year;
    return formattedDate;
  };

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

  // useEffect(()=>{
  //   console.log(bookingData[0].booking_id);
  // })

  useEffect(() => {
    if (bookingData && bookingData.length > 0) {
      console.log(bookingData[0].room_image[0]);
    }
  }, []);

  // สร้างฟังก์ชันเพื่อรับวันที่ยกเลิก จาก ChangeDatePopUp component
  const receiveCancel = (cancelDate, booking_id, buttonId) => {
    if (cancelDate !== "") {
      setShowCancelDate(true);
      setCancelDate(cancelDate);
      setCancelBookingID(booking_id);
    }
    console.log(cancelDate);
    console.log(booking_id);
    console.log(buttonId);
  };

  const bookingDataArray = [
    {
      booking_id: "47",
      main_image: "/superior-w453.png",
      roomtypetitle: "Superior Garden View",
      created_at: "2023-09-08T08:52:34.629Z",
      checkin_date: "2023-09-14T17:00:00.000Z",
      checkout_date: "2023-09-15T17:00:00.000Z",
      guests: 3,
      night: "3",
      payment_method: "Credit Card - *888",
      fullprice: "3,400.00",
      special_request: "Airport tranfer",
      promotion: "0",
      total_price: "3,600.00",
      additional: "Can i have some chocolate?",
      is_cancel: true,
      cancel_date: "2023-09-10T17:00:00.000Z",
    },
    {
      booking_id: "52",
      main_image: "/supreme-w543.png",
      roomtypetitle: "Supreme",
      created_at: "2023-09-10T08:52:34.629Z",
      checkin_date: "2023-09-14T17:00:00.000Z",
      checkout_date: "2023-09-15T17:00:00.000Z",
      guests: 2,
      night: "1",
      payment_method: "Credit Card - *777",
      fullprice: "2,000.00",
      special_request: "Airport tranfer",
      promotion: "-400",
      total_price: "1,800.00",
      additional: "",
      is_cancel: false,
      cancel_date: "2023-09-11T17:00:00.000Z",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center px-[72px] max-w-[1440px] h-auto bg-[#F1F2F6]">
      <h1 className="font-mono text-[68px] font-medium leading-[125%] tracking-[-1.36px]  self-start py-16">
        Booking History
      </h1>
      {bookingDataArray.map((bookingData, index) => (
        <div
          key={bookingData.booking_id}
          className="history-card flex flex-col w-full border-b border-[#E4E6ED] "
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
                    Booking date: {convertDate(bookingData.created_at)}{" "}
                  </div>
                  {/* {console.log(showCancelDate)} */}
                  {showCancelDate &&
                    (cancelBookingID === bookingData.booking_id) && (
                      <div>Cancellation date: {cancelDate}</div>
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
                    {convertDate(bookingData.checkin_date)} | After 2:00 PM
                  </span>
                </div>
                <div className="check-out-box my-8">
                  <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                    Check-out
                  </p>
                  <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                    {convertDate(bookingData.checkout_date)}| Before 12:00 PM
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
          />
        </div>
      ))}
      {/* End history-card */}
    </section>
  );
}
