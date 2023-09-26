"use client";

import React, { useEffect } from "react";
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
    try {
      const quantity = Math.ceil(guests / rooms);
      const dateFrom = date.from;
      setChekedIn(dateFrom.toISOString().split("T")[0]);
      const dateTo = date.to;
      setChekedOut(dateTo.toISOString().split("T")[0]);
      if (page === "searchpage" && checkedIn && checkedOut && quantity >= 1) {
        handleSearch(checkedIn, checkedOut, quantity);
      } else if (
        page === "landingpage" &&
        checkedIn &&
        checkedOut &&
        quantity >= 1
      ) {
        handleSearch(checkedIn, checkedOut, quantity);
        router.push("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let styleProps;
  let buttonVar;
  if (page === "landingpage") {
    styleProps =
      "flex items-center w-full max-w-4xl gap-4 p-6 bg-white rounded-md justify-evenly bottom-32 ";
    buttonVar = "primary";
  } else if (page === "searchpage") {
    styleProps =
      "z-30 bg-white flex item-center w-full max-w-7xl gap-4 p-6 justify-center mx-auto";
    buttonVar = "secondary";
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
    } else if (action === "minus" && guests > 1 && guests > rooms) {
      setGuests(guests - 1);
    } else {
      setGuests(guests);
    }
  };

  useEffect(() => {
    if (guests < rooms) {
      setGuests(rooms);
    }
  }, [rooms]);

  useEffect(() => {
    const handleScroll = () => {
      if (customRoomOpen && window.scrollY > 0) {
        setCustomRoomOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [customRoomOpen]);

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
                <p className="flex-1">Room</p>
                <div className="flex items-center justify-between flex-1 gap-4">
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
                <p className="flex-1">Guest</p>
                <div className="flex items-center justify-between flex-1 gap-4">
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
      <Button
        onClick={() => handleOnClickSearch()}
        className={`${buttonVariants({
          variant: buttonVar,
        })} self-end`}
      >
        Search
      </Button>
    </article>
  );
}
