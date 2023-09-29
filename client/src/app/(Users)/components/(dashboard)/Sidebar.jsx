"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const buttonMenuStyle =
    "w-full h-16 hover:bg-green-600 active:bg-green-700 font-[500px] text-sm  pl-4";

  const isPathnameActive = (path) => {
    return pathname === path;
  };

  const handleClick = (path) => {
    if (pathname !== path) {
      return router.push(path);
    }
  };
  const handleLogout = async () => {
    try {
      //logout user from session
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) {
        console.error("Error during logout:", error.message);
      } else {
        alert("Logged out successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    }
  };

  return (
    <>
      <div className=" flex flex-col w-[240px] h-full  bg-green-800 text-gray-300 shrink-0">
        <div className="basis-1/6 flex justify-center items-start pt-10 text-green-400">
          <div>
            <Image
              src="/logo-invert.svg"
              width={120}
              height={50}
              alt="logo-invert"
              priority
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
            onClick={() => handleClick("/dashboard/booking")}
          >
            <div className="flex gap-5 items-center p-4">
              <Image
                src="/booking-invert.svg"
                width={24}
                height={24}
                alt="booking-invert"
              />
              Customer Booking
            </div>
          </button>
          <button
            className={`${buttonMenuStyle} ${
              isPathnameActive("/dashboard/manage") &&
              "bg-green-600 hover:bg-green-600 active:bg-green-600"
            }`}
            onClick={() => handleClick("/dashboard/manage")}
          >
            <div className="flex gap-5 items-center p-4">
              <Image
                src="/manage-invert.svg"
                width={24}
                height={24}
                alt="manage-invert"
              />
              Room Management
            </div>
          </button>
          <button
            className={`${buttonMenuStyle} ${
              isPathnameActive("/dashboard/hotel") &&
              "bg-green-600 hover:bg-green-600 active:bg-green-600"
            }`}
            onClick={() => handleClick("/dashboard/hotel")}
          >
            <div className="flex gap-5 items-center p-4">
              <Image
                src="/hotel-invert.svg"
                width={24}
                height={24}
                alt="hotel-invert"
              />
              Hotel Infomation
            </div>
          </button>
          <button
            className={`${buttonMenuStyle} ${
              isPathnameActive("/dashboard/room") &&
              "bg-green-600 hover:bg-green-600 active:bg-green-600"
            }`}
            onClick={() => handleClick("/dashboard/room")}
          >
            <div className="flex gap-5 items-center p-4">
              <Image
                src="/room-invert.svg"
                width={24}
                height={24}
                alt="room-invert"
              />
              Room & Property
            </div>
          </button>
        </div>
        <div className="basis-1/4 flex items-start border-t border-t-[#465C50] py-7 px-6">
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            <div className="flex gap-4 items-center">
              <Image
                src="/logout-invert.svg"
                width={24}
                height={24}
                alt="logout-invert"
              />
              Log Out
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
