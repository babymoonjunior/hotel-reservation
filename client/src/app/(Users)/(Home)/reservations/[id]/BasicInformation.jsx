"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link as LinkScroll } from "react-scroll";
import { FaCaretDown, FaRegCalendarAlt } from "react-icons/fa";

export default function BasicInformation({ setStep, step, supabaseData }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  }

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
            value={supabaseData[0].full_name}
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
            value={supabaseData[0].email}
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
            value={supabaseData[0].id_card}
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
            value={formatDate(supabaseData[0].birthdate)}
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
            value={supabaseData[0].country}
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
