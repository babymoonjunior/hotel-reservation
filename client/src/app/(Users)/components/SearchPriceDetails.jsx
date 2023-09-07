"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookNow from "./BookNowBTN";
import { useState } from "react";
import PopUpwindows from "./PopUpWindows";

export default function PriceDetails(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { fullPrice, discountPrice, available_rooms_count, index, roomData } =
    props;
  console.log("room:", roomData);
  return (
    <div className="price-button-container bg-[#F7F7FB] flex flex-col items-end justify-between py-5">
      <div className="flex flex-col items-end price-box">
        <p className="full-price line-through text-[#646D89] text-base font-normal">
          {fullPrice}
        </p>
        <p className="discount-price text-[#2A2E3F] text-xl font-semibold leading-[150%]">
          {discountPrice}
        </p>
      </div>
      <div className="unit-text-box text-base text-[#646D89] font-normal flex flex-col items-end">
        <p className="per-night">Per Night</p>
        <p className="include-tax">(Including Taxes & Fees)</p>
      </div>
      <div
        className={`${
          available_rooms_count <= 2 && available_rooms_count > 0
            ? "bg-[#fbb3b3] text-[#A50606]"
            : ""
        } rounded w-fit h-8 flex items-center px-3 py-1`}
      >
        {available_rooms_count <= 2 && available_rooms_count > 0
          ? `เหลืออีก ${available_rooms_count} ห้องสุดท้าย`
          : null}
      </div>

      {/* กลุ่ม button */}
      <div className="flex flex-row button-wrapper">
        <Button
          variant="secondary"
          onClick={() => setModalOpen(!modalOpen)}
          className="border-none mx-6 bg-[#F7F7FB] relative"
        >
          Room Detail
          {modalOpen && (
            <PopUpwindows
              roomData={roomData}
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
            />
          )}
        </Button>
        {/* <Link href={`/fullview/${index}`} >
        <Button>Book Now</Button>
      </Link> */}
        <BookNow />
      </div>
    </div>
  );
}
