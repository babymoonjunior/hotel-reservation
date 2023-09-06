"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DatePickerWithRange } from "@/components/ui/datepicker";
import { Button, buttonVariants } from "@/components/ui/button";

export default function SearchBar() {
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [customRoomOpen, setCustomRoomOpen] = useState(false);

  const handlerAddRoom = (action) => {
    if (action === "add") {
      setRooms(rooms + 1);
    } else if (action === "minus" && rooms > 1) {
      setRooms(rooms - 1);
    } else {
      setRooms(rooms);
    }
  };
  const handlerAddGuest = (action) => {
    if (action === "add") {
      setGuests(guests + 1);
    } else if (action === "minus" && guests > 1) {
      setGuests(guests - 1);
    } else {
      setGuests(guests);
    }
  };

  return (
    <article className="absolute flex items-center w-full max-w-4xl gap-4 p-6 translate-x-1/2 bg-white rounded-md justify-evenly bottom-32 right-1/2">
      <div>
        <p>Check In - Check Out</p>
        <DatePickerWithRange className="border border-gray-900 rounded-md" />
      </div>
      <div>
        <p className="text-gray-900 ">Rooms & Guests</p>
        <div>
          <div
            onClick={() => setCustomRoomOpen(!customRoomOpen)}
            className={`pl-6 relative w-60 flex items-center justify-between px-2 py-1 border border-black rounded-md cursor-pointer`}
          >
            <p className="font-sans text-utility-black">
              {rooms} Room {guests} Guests
            </p>
            <Image
              src="/arrow-down.svg"
              alt="Arror Down"
              width={40}
              height={40}
            />
          </div>
          {customRoomOpen && (
            <div className="absolute p-4 mt-2 bg-white border border-gray-400 rounded-lg w-60">
              <div className="flex items-center justify-between my-2 text-black">
                <p className="">Room</p>
                <div className="flex items-center justify-between gap-4">
                  <button onClick={() => handlerAddRoom("minus")}>
                    <Image
                      src="/minus.svg"
                      alt="minus"
                      width={25}
                      height={30}
                    />
                  </button>
                  <p>{rooms}</p>
                  <button onClick={() => handlerAddRoom("add")}>
                    <Image src="/plus.svg" alt="minus" width={25} height={30} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between my-2 ">
                <p className="">Guest</p>
                <div className="flex items-center justify-between gap-4">
                  <button onClick={() => handlerAddGuest("minus")}>
                    <Image
                      src="/minus.svg"
                      alt="minus"
                      width={25}
                      height={30}
                    />
                  </button>
                  <p>{guests}</p>
                  <button onClick={() => handlerAddGuest("add")}>
                    <Image src="/plus.svg" alt="minus" width={25} height={30} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Button className="self-end ">Search</Button>
    </article>
  );
}
