import React from "react";
import { Button } from "@/components/ui/button";
import ImageSlide from "./ImageSlide";
import getRoomDetail from "@/lib/getRoomDetail";
import RandomRoom from "./RandomRoom";
import Link from "next/link";

export default async function page({ params }) {
  let room;
  try {
    const res = await getRoomDetail(params.id);
    room = res.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <div className="w-full mx-auto mt-2 max-w-7xl">
        <ImageSlide roomImage={room.room_image} />
      </div>
      <div className="flex flex-col w-full max-w-3xl gap-20 pb-20 mx-auto mt-24">
        <div className="flex flex-col gap-16">
          <h1 className="text-6xl font-medium leading-tight tracking-[-1.36px] font-open-sans text-green-800">
            {room.roomtypetitle}
          </h1>
          <div className="flex items-start justify-between h-32">
            <div className="flex flex-col items-start justify-between w-full h-full max-w-sm">
              <p className="leading-normal text-gray-700 -tracking-tight">
                {room.description}
              </p>
              <ul className="flex w-full pb-3 leading-6 text-gray-700 -tracking-tight">
                <li className="pr-2 border-r border-gray-700">
                  {room.guests} Person
                </li>
                <li className="px-2 border-r border-gray-700">
                  1 {room.bedtype}
                </li>
                <li className="px-2">{room.roomarea} sqm</li>
              </ul>
            </div>

            <div className="flex flex-col items-end justify-between h-full">
              <div className="w-full text-right">
                <p className="leading-6 text-gray-700 line-through">
                  THB {room.fullprice}
                </p>
                <h2 className="text-xl font-semibold leading-8 tracking-wide text-gray-900 ">
                  THB {room.discountprice}
                </h2>
              </div>
              <Button className="w-full rounded-none">
                <Link href={"/search"}>Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-sans text-xl font-semibold leading-normal text-black -tracking-wide my-7">
            Room Amenities
          </h1>
          <ul className="grid grid-cols-2 leading-6 text-gray-700 list-disc list-inside tracking gap-y-1">
            {room.amenities.map((item, index) => (
              <li key={index}> {item} </li>
            ))}
          </ul>
        </div>
      </div>
      <RandomRoom />
    </div>
  );
}
