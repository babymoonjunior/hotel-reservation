"use client";

import React from "react";
import Image from "next/image";
import { DatePickerWithRange } from "@/components/ui/datepicker";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSearchContext } from "@/context/searchRoom";

export default function SearchBar({ page }) {
  const {
    today,
    date,
    setDate,
    rooms,
    setRooms,
    guests,
    setGuests,
    customRoomOpen,
    setCustomRoomOpen,
    setChekedIn,
    setChekedOut,
    checkedIn,
    checkedOut,
    handleSearch,
  } = useSearchContext();
  const router = useRouter();

  const handleOnClickSearch = () => {
    const dateFrom = date.from;
    setChekedIn(dateFrom.toISOString().split("T")[0]);
    const dateTo = date.to;
    setChekedOut(dateTo.toISOString().split("T")[0]);
    if (page === "searchpage" && checkedIn && checkedOut && guests >= 1) {
      handleSearch(checkedIn, checkedOut, guests);
    } else if (
      page === "landingpage" &&
      checkedIn &&
      checkedOut &&
      guests >= 1
    ) {
      handleSearch(checkedIn, checkedOut, guests);
      router.push("/search");
    }
  };

  let styleProps;
  if (page === "landingpage") {
    styleProps =
      "absolute flex items-center w-full max-w-4xl gap-4 p-6 translate-x-1/2 bg-white rounded-md justify-evenly bottom-32 right-1/2 ";
  } else if (page === "searchpage") {
    styleProps =
      "sticky top-0 z-30 bg-white flex item-center w-full max-w-7xl gap-4 p-6 justify-center mx-auto";
  }

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
    <article className={styleProps}>
      <div>
        <p>Check In - Check Out</p>
        <DatePickerWithRange
          date={date}
          setDate={setDate}
          today={today}
          className="border border-gray-900 rounded-md"
        />
      </div>
      <div>
        <p className="text-gray-900 ">Rooms & Guests</p>
        <div>
          <div
            onClick={() => setCustomRoomOpen(!customRoomOpen)}
            className={`pl-6 relative w-60 flex items-center justify-between px-2 py-1 border border-black rounded-md cursor-pointer`}
          >
            <p className="font-sans text-sm text-utility-black">
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
                      className="w-full"
                      width={25}
                      height={30}
                    />
                  </button>
                  <p>{rooms}</p>
                  <button onClick={() => handlerAddRoom("add")}>
                    <Image
                      src="/plus.svg"
                      alt="minus"
                      className="w-full"
                      width={25}
                      height={30}
                    />
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
                      className="w-full"
                      width={25}
                      height={30}
                    />
                  </button>
                  <p>{guests}</p>
                  <button onClick={() => handlerAddGuest("add")}>
                    <Image
                      src="/plus.svg"
                      alt="minus"
                      className="w-full"
                      width={25}
                      height={30}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Button onClick={() => handleOnClickSearch()} className="self-end ">
        Search
      </Button>
    </article>
  );
}
