"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link as LinkScroll } from "react-scroll";
import { FaCaretDown, FaRegCalendarAlt } from "react-icons/fa";

export default function BasicInformation({ setStep, step }) {
  const formatData = (data) => {
    return data.replace(/(\d{4})(\d{2})(\d{4})(\d{5})/, "$1 $2 $3 $4");
  };
  function formatDate(date) {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }
  const date = new Date();

  return (
    <div className="flex flex-col gap-10 p-10">
      <p className="text-xl font-semibold leading-normal text-gray-600 -tracking-tight">
        Basic Information
      </p>
      <div>
        <label htmlFor="fullname">
          <p className="leading-normal text-gray-900">Full Name</p>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={"Kate Cho"}
            disabled
            className="w-full p-3 leading-normal text-black rounded-sm disabled:bg-white disabled:border disabled:border-gray-400"
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          <p className="leading-normal text-gray-900">Email</p>
          <input
            type="email"
            name="email"
            id="email"
            value="kate.cho@gmail.com"
            disabled
            className="w-full p-3 leading-normal text-black rounded-sm disabled:bg-white disabled:border disabled:border-gray-400"
          />
        </label>
      </div>
      <div>
        <label htmlFor="idnumber">
          <p className="leading-normal text-gray-900">ID Number</p>
          <input
            type="text"
            id="idnumber"
            name="idnumber"
            value={formatData("111111111111111")}
            disabled
            className="w-full p-3 leading-normal text-black rounded-sm disabled:bg-white disabled:border disabled:border-gray-400"
          />
        </label>
      </div>
      <div className="relative">
        <label htmlFor="birthdate">
          <p className="leading-normal text-gray-900">Date of Birth</p>
          <input
            type="text"
            name="birthdate"
            id="birthdate"
            value={formatDate(date)}
            disabled
            className="w-full p-3 leading-normal text-black rounded-sm disabled:bg-white disabled:border disabled:border-gray-400"
          />
          <FaRegCalendarAlt className="absolute z-10 text-gray-600 right-5 bottom-4" />
        </label>
      </div>
      <div className="relative">
        <label htmlFor="country">
          <p className="leading-normal text-gray-900">Country</p>
          <input
            type="text"
            name="country"
            id="country"
            value="Thailand"
            disabled
            className="w-full p-3 leading-normal text-black rounded-sm disabled:bg-white disabled:border disabled:border-gray-400"
          />
          <FaCaretDown className="absolute z-10 text-gray-600 right-5 bottom-4" />
        </label>
      </div>
      <div>
        <LinkScroll
          activeClass="active"
          to="bookingroom"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <Button
            onClick={() => setStep(step + 1)}
            className="float-right px-8 py-4 text-lg w-fit"
            type="button"
          >
            Next
          </Button>
        </LinkScroll>
      </div>
    </div>
  );
}
