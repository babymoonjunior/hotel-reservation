"use client";

import Image from "next/image";
import BookingAccordion from "./BookingAccordion";
import BookingHistoryBTN from "./BookingHistoryBTN";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import ModalMessage from "./ModalMessage";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function BookingHistory() {
  const [showCancelDate, setShowCancelDate] = useState(false);
  const [cancelDate, setCancelDate] = useState("");
  const [cancelBookingID, setCancelBookingID] = useState("");
  const [bookingData, setBookingData] = useState([]);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const router = useRouter();

  const supabase = createClientComponentClient();

  const getBookingHistory = async () => {
    try {
      const currentUser = await supabase.auth.getSession();
      if (!currentUser.data.session) {
        router.push("/login");
        return;
      }
      const profileId = currentUser.data.session.user.id;
      // console.log(profileId);

      const result = await axios.get(
        `http://localhost:4000/history/${profileId}`
      );
      setBookingData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookingHistory();
  }, []);

  useEffect(() => {
    console.log("bookingData", bookingData);
  });

  // ฟังก์ชันรับวันที่ยกเลิก จาก ChangeDatePopUp component
  const receiveCancel = (cancelDate, booking_id) => {
    if (cancelDate !== "") {
      setShowCancelDate(true);
      setCancelDate(cancelDate);
      setCancelBookingID(booking_id);
    }
  };

  return (
    <section className="w-full bg-[#F1F2F6]">
      <article className="flex flex-col justify-center items-center px-[72px] mx-auto max-w-[1440px] w-full h-auto">
        <h1 className="font-mono text-[68px] font-medium leading-[125%] tracking-[-1.36px]  self-start py-16">
          Booking History
        </h1>
        {bookingData.map((bookingData, index) => (
          <div
            key={index}
            className="history-card flex flex-col w-full border-b border-[#E4E6ED] relative "
          >
            <div className="flex flex-row pt-10 image-booking-container">
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
              <div className="w-full booking-details-section">
                {/* room title */}
                <div className="flex flex-row items-center justify-between w-full title-container">
                  <p className="room-title font-sans text-black text-[28px] font-semibold leading-[150%] tracking-[-0.56px]">
                    {bookingData.roomtypetitle}
                  </p>
                  {/* Booking & Cancellation Date */}
                  <span className="text-[#9AA1B9] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                    <div>
                      Booking date:{" "}
                      {format(
                        new Date(bookingData.created_at),
                        "EEE, dd MMM yyyy"
                      )}{" "}
                    </div>
                    {/* {console.log(showCancelDate)} */}
                    {(bookingData.payment_status === "refunded" ||
                      bookingData.payment_status ===
                        "cancelled without refund") && (
                      <div>
                        Cancellation date:{" "}
                        {format(
                          new Date(bookingData.updated_at),
                          "EEE, dd MMM yyyy"
                        )}
                      </div>
                    )}
                  </span>
                </div>

                {/* check-in-out-table */}
                <div className="flex flex-row check-in-out-container">
                  <div className="my-8 mr-8 check-in-box">
                    <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                      Check-in
                    </p>
                    <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                      {format(
                        new Date(bookingData.checkin_date),
                        "EEE, dd MMM yyyy"
                      )}{" "}
                      | After 2:00 PM
                    </span>
                  </div>
                  <div className="my-8 check-out-box">
                    <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                      Check-out
                    </p>
                    <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                      {format(
                        new Date(bookingData.checkout_date),
                        "EEE, dd MMM yyyy"
                      )}
                      | Before 12:00 PM
                    </span>
                  </div>
                </div>

                {/* booking detail accordion */}
                <BookingAccordion
                  room_price={bookingData.room_price}
                  guests={bookingData.guests}
                  night={bookingData.night}
                  payment_method={bookingData.payment_method}
                  roomtypetitle={bookingData.roomtypetitle}
                  special_request={bookingData.special_request}
                  total_price={bookingData.total_price}
                  additional={bookingData.additional}
                  room={bookingData.room}
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
              payment_method={bookingData.payment_method}
              setMessageModalOpen={setMessageModalOpen}
              setMessageAlert={setMessageAlert}
              checkinDate={format(
                new Date(bookingData.checkin_date),
                "EEE, dd MMM yyyy"
              )}
              checkoutDate={format(
                new Date(bookingData.checkout_date),
                "EEE, dd MMM yyyy"
              )}
              checkinStatus={bookingData.checkin_status}
            />
          </div>
        ))}
        {/* End history-card */}
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
