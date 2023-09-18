"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const buttonMenuStyle =
    "w-full h-16 hover:bg-green-600 active:bg-green-700 font-[500px] text-sm  pl-4";

  const isPathnameActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      <div className=" flex flex-col w-[240px] h-[1024px]  bg-green-800 text-gray-300 fixed">
        <div className="basis-1/6 flex justify-center items-start pt-10 text-green-400">
          <div>
            <Image
              src="/logo-invert.svg"
              width={120}
              height={50}
              alt="logo-invert"
            />
            <t className="font-sans text-sm">Admin Panel Control</t>
          </div>
        </div>
        <div className="basis-1/2 flex flex-col justify-start">
          <button
            className={`${buttonMenuStyle} ${
              isPathnameActive("/dashboard/booking") &&
              "bg-green-600 hover:bg-green-600 active:bg-green-600"
            }`}
          >
            <div className="flex gap-5 items-center p-4">
              <Image src="/booking-invert.svg" width={24} height={24} />
              Cutomer Booking
            </div>
          </button>
          <button
            className={`${buttonMenuStyle} ${
              isPathnameActive("/dashboard/manage") &&
              "bg-green-600 hover:bg-green-600 active:bg-green-600"
            }`}
          >
            <div className="flex gap-5 items-center p-4">
              <Image src="/manage-invert.svg" width={24} height={24} />
              Room Management
            </div>
          </button>
          <button
            className={`${buttonMenuStyle} ${
              isPathnameActive("/dashboard/hotel") &&
              "bg-green-600 hover:bg-green-600 active:bg-green-600"
            }`}
          >
            <div className="flex gap-5 items-center p-4">
              <Image src="/hotel-invert.svg" width={24} height={24} />
              Hotel Infomation
            </div>
          </button>
          <button
            className={`${buttonMenuStyle} ${
              isPathnameActive("/dashboard/room") &&
              "bg-green-600 hover:bg-green-600 active:bg-green-600"
            }`}
          >
            <div className="flex gap-5 items-center p-4">
              <Image src="/room-invert.svg" width={24} height={24} />
              Room & Property
            </div>
          </button>
        </div>
        <div className="basis-1/4 flex items-start border-t border-t-[#465C50] py-7 px-6">
          <button>
            <div className="flex gap-4 items-center">
              <Image src="/logout-invert.svg" width={24} height={24} />
              Log Out
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
