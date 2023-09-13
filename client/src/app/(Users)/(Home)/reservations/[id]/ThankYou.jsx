import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ThankYou({
  convertDate,
  roomDetail,
  userData,
  rooms,
  night,
  specialRequest,
  selectedRequests,
  roomPrice,
  additional,
  totalPrice,
  checkedIn,
  checkedOut,
  paymentMethod,
  convertPrice,
  formatNumberWithCommasAndTwoDecimals,
}) {
  return (
    <div id="thankyou" className="w-full max-w-3xl mx-auto rounded-sm h-fit">
      <div className="w-full p-6 bg-green-800 rounded-t-sm">
        <div className="w-full max-w-lg mx-auto">
          <h1 className="font-serif text-5xl font-medium leading-tight text-center -tracking-wider text-utility-white">
            Thank you for booking
          </h1>
          <p className="mt-3 text-sm font-medium leading-5 text-center text-green-400 -tracking-tight">
            We are looking forward to hosting you at our place. We will send you
            more information about check-in and staying at our Neatly closer to
            your date of reservation
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-10 p-6 text-white bg-green-700 rounded-b-sm">
        <div className="flex w-full p-6 bg-green-600 rounded-sm">
          <div className="flex-1 w-full">
            <p className="mb-2">
              {convertDate(checkedIn)} - {convertDate(checkedOut)}
            </p>
            <p>{roomDetail.guests} Guests</p>
          </div>
          <div className="flex flex-1 gap-6">
            <div className="flex-1 text-white">
              <p className="mb-2 font-semibold">Check-in</p>
              <p>After 2:00 PM</p>
            </div>
            <div className="flex-1 text-white">
              <p className="mb-2 font-semibold">Check-out</p>
              <p>Before 12:00 PM</p>
            </div>
          </div>
        </div>
        <p className="text-right text-green-300">
          Payment succes via{" "}
          {paymentMethod === "creditcard" ? (
            <span>
              Credit Card - *{userData.user_metadata.card_number.slice(-3)}
            </span>
          ) : (
            <span>Cash</span>
          )}
        </p>
        <div>
          <div className="pb-4 border-b border-gray-300">
            <div className="flex items-start justify-between w-full mb-3">
              <p className="text-green-300">
                {roomDetail.roomtypetitle}
                <span className="text-sm">
                  <br />({rooms} Room x {night} Night)
                </span>
              </p>
              <p className="font-semibold">
                {formatNumberWithCommasAndTwoDecimals(roomPrice)}
              </p>
            </div>
            {specialRequest.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between w-full mb-3"
                >
                  <p className="text-green-300"> {item} </p>
                  <p className="font-semibold">{convertPrice(item)}</p>
                </div>
              );
            })}
            {selectedRequests.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between w-full mb-3"
                >
                  <p className="text-green-300"> {item} </p>
                  <p className="font-semibold">{convertPrice(item)}</p>
                </div>
              );
            })}
            {additional !== undefined && (
              <div className="flex items-center w-full mb-3">
                <p className="text-green-300"> {additional} </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between w-full pt-6">
            <p className="text-green-300">Total</p>
            <p className="text-xl font-semibold">
              THB {formatNumberWithCommasAndTwoDecimals(totalPrice)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-10 mt-14">
        <Link href="/bookinghistory">
          <Button
            className={`${buttonVariants({
              variant: "ghost",
            })} w-full max-w-fit`}
          >
            Check Booking Detail
          </Button>
        </Link>

        <Link href={"/"}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
