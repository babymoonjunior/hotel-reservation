"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Link as LinkScroll } from "react-scroll";

import { Button, buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-utility-white">
      <div className="w-full max-w-7xl  h-[100px] mx-auto justify-between font-open-sans flex items-center text-utility-black">
        <div className="flex  items-center w-[659px] h-auto">
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
            <LinkScroll
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <Button
                className={`${buttonVariants({
                  variant: "ghost",
                })} text-utility-black w-auto h-auto  `}
              >
                <span className="text-[14px]">About Nestly</span>
              </Button>{" "}
            </LinkScroll>
          </div>
          <div className="w-[168px] h-[100px]  flex justify-center items-center ">
            <LinkScroll
              activeClass="active"
              to="service"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <Button
                className={`${buttonVariants({
                  variant: "ghost",
                })} text-utility-black w-[168px] h-auto   `}
              >
                <span className="text-[14px]">Service & Facilities</span>
              </Button>
            </LinkScroll>
          </div>
          <div className="w-[143px] h-[100px]  flex justify-center items-center ">
            <LinkScroll
              activeClass="active"
              to="roomsuit"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
            >
              {" "}
              <Button
                className={`${buttonVariants({
                  variant: "ghost",
                })} text-utility-black w-[143px] h-auto   `}
              >
                {" "}
                <span className="text-[14px]">Room & Suits</span>
              </Button>
            </LinkScroll>
          </div>
        </div>

        <div className="flex">
          <Link href="/login">
            <Button className={buttonVariants({ variant: "ghost" })}>
              Log in
            </Button>
          </Link>

          <Button className={buttonVariants({ variant: "primary" })}>
            Book Now
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
