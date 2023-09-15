import React from "react";
import Image from "next/image";

export default function BookingDetail({
  convertDate,
  roomDetail,
  rooms,
  night,
  specialRequest,
  selectedRequests,
  roomPrice,
  additional,
  totalPrice,
  checkedIn,
  checkedOut,
  convertPrice,
  formatNumberWithCommasAndTwoDecimals,
}) {
  return (
    <div className="sticky w-full max-w-sm rounded-sm top-28 h-fit">
      <div className="inline-flex items-center w-full gap-3 p-6 bg-green-800 rounded-t-sm">
        <Image
          src={"/booking.svg"}
          alt="booking"
          width={100}
          height={100}
          className="w-6 h-6 "
          style={{
            filter:
              "invert(68%) sepia(14%) saturate(447%) hue-rotate(94deg) brightness(88%) contrast(83%)",
          }}
        />
        <p className="text-xl font-semibold text-white">Booking Detail</p>
      </div>
      <div className="flex flex-col gap-10 p-6 text-white bg-green-600 rounded-b-sm">
        <div className="flex w-full">
          <div className="flex-1 text-white">
            <p className="mb-2 font-semibold">Check-in</p>
            <p>After 2:00 PM</p>
          </div>
          <div className="flex-1 text-white">
            <p className="mb-2 font-semibold">Check-out</p>
            <p>Before 12:00 PM</p>
          </div>
        </div>
        <div className="w-full">
          <p>
            {convertDate(checkedIn)} - {convertDate(checkedOut)}
          </p>
          <p>{roomDetail.guests} Guests</p>
        </div>
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
      <div className="p-4 mt-4 bg-gray-300 rounded-sm">
        <ul className="p-4 text-xs text-green-600 list-disc">
          <li className="mb-5">
            Cancel booking will get full refund if the cancelation occurs before
            24 hours of the check-in date.
          </li>
          <li>
            Able to change check-in or check-out date booking within 24 hours of
            the booking date
          </li>
        </ul>
      </div>
    </div>
  );
}
