"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="fixed w-[1440px]  h-[100px] pl-[160px] mr-[48px]  font-open-sans flex items-center bg-[#FFFFFF] text-[utility-black]  z-50">
      <div className="flex justify-center items-center w-[659px] h-auto">
        <Link href="/">
          <Image
            src={"/logo.svg"}
            alt="logo image profile "
            width={167}
            height={45}
            style={{ marginRight: "48px" }}
          />
        </Link>

        <div className="w-[133px] h-[100px]  flex justify-center items-center ">
          <Button
            className={`${buttonVariants({
              variant: "ghost",
            })} text-utility-black w-auto h-auto  `}
          >
            <span className="text-[14px]">About Nestly</span>
          </Button>
        </div>
        <div className="w-[168px] h-[100px]  flex justify-center items-center ">
          <Button
            className={`${buttonVariants({
              variant: "ghost",
            })} text-utility-black w-[168px] h-auto   `}
          >
            <span className="text-[14px]">Service & Facilities</span>
          </Button>
        </div>
        <div className="w-[143px] h-[100px]  flex justify-center items-center ">
          <Button
            className={`${buttonVariants({
              variant: "ghost",
            })} text-utility-black w-[143px] h-auto   `}
          >
            <span className="text-[14px]">Room & Suits</span>
          </Button>
        </div>
      </div>

      <div className="flex pl-[229px] pr-[160px]">
        <Button className={buttonVariants({ variant: "ghost" })}>Log in</Button>

        <Button className={buttonVariants({ variant: "primary" })}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
