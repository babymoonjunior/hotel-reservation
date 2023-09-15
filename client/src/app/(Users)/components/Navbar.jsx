"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Link as LinkScroll } from "react-scroll";
// pond
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// pond

import { Button, buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  //pond
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const handleLogout = async () => {
    try {
      //logout user from session
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) {
        console.error("Error during logout:", error.message);
      } else {
        setLoggedInUser(null);
        // router.refresh();
        window.location.reload();
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const currentUser = await supabase.auth.getSession();
        const userId = currentUser.data.session.user.id;
        const currentUserdata = await supabase
          .from("profiles")
          .select()
          .eq("id", userId);
        console.log(currentUser);
        if (currentUser) {
          setUsername(currentUserdata.data[0].username);
          setAvatar(currentUserdata.data[0].avatar_url);
          setLoggedInUser(currentUser);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  //pond
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-utility-white">
      <div className="w-full max-w-7xl  h-[100px] mx-auto justify-between font-open-sans flex items-center text-utility-black">
        <div className="flex  items-center w-[659px] h-auto">
          <Link href="/">
            <Image
              src={"/logo.svg"}
              alt="Nestly logo"
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

        <div className="flex gap-3">
          {/* <Link href="/login">
            <Button className={buttonVariants({ variant: "ghost" })}>
              Log in
            </Button>
          </Link>

          <Button className={buttonVariants({ variant: "primary" })}>
            Book Now
          </Button> */}
          {/* pond */}
          {loggedInUser ? (
            <>
              <Avatar className="flex items-center justify-center bg-utility-bg">
                <AvatarImage
                  src="/bell.svg"
                  className="w-[18px] h-[18px] opacity-50"
                  alt="Notification Bell"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar>
                    <AvatarImage src={avatar} alt="UP" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border border-gray-200 bg-utility-white">
                  <DropdownMenuLabel className="text-center text-gray-700">
                    Hello, {username}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-gray-700 border-t rounded-none border-t-gray-300">
                    <Link
                      href="/profileupdate"
                      className="flex items-center justify-center gap-3"
                    >
                      <div className="opacity-40">
                        <Image
                          src="/man.svg"
                          width={20}
                          height={26}
                          alt="User Profile Icon"
                        />
                      </div>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 ">
                    <Link
                      href="/paymentupdate"
                      className="flex items-center justify-center gap-3"
                    >
                      <div className="opacity-40">
                        <Image
                          src="/credit.svg"
                          width={20}
                          height={26}
                          alt="Payment Method Icon"
                        />
                      </div>
                      Payment Method
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 ">
                    <Link
                      href="/bookinghistory"
                      className="flex items-center justify-center gap-3"
                    >
                      <div className="opacity-40">
                        <Image
                          src="/booking.svg"
                          width={20}
                          height={26}
                          alt="Booking History Icon"
                        />
                      </div>
                      Booking History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 text-gray-700 border-t rounded-none border-t-gray-300">
                    <div className="opacity-40">
                      <Image
                        src="/logout.svg"
                        width={20}
                        height={26}
                        alt="Logout Icon"
                      />
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className={buttonVariants({ variant: "ghost" })}>
                  Log in
                </Button>
              </Link>
              <Link href="/search">
                {" "}
                <Button className={buttonVariants({ variant: "primary" })}>
                  Book Now
                </Button>
              </Link>
            </>
          )}
          {/* pond */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
