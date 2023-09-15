"use client";
import Image from "next/image";

export default function Sidebar() {
  const buttonMenuStyle = "w-full h-16 hover:bg-green-600 active:bg-green-700 ";
  return (
    <>
      <div className="flex flex-col w-60 h-[1024px]  bg-green-800 text-gray-300 sticky">
        <div className="sidebar-header basis-1/6 flex justify-center items-center p-8">
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
        <div className="menu-container border border-red-700 basis-1/2 flex flex-col items-center">
          <button className={buttonMenuStyle}>Cutomer Booking</button>
          <button className={buttonMenuStyle}>Room Management</button>
          <button className={buttonMenuStyle}>Hotel Infomation</button>
          <button className={buttonMenuStyle}>Room & Property</button>
        </div>
        <div className="logout-container basis-1/4 flex justify-center items-start p-8 border border-blue-500">
          <button>Log Out</button>
        </div>
      </div>
    </>
  );
}
