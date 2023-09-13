"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link as LinkScroll } from "react-scroll";
import { useFormContext, Controller } from "react-hook-form";

export default function SpecialRequest({ setStep, step }) {
  const { register, control, methods } = useFormContext();

  const standardRequests = [
    { id: "earlycheckin", value: "Early check-in" },
    { id: "latecheckout", value: "Late check-out" },
    { id: "nonsmokingroom", value: "Non-smoking-room" },
    { id: "roomonhighfor", value: "A room on the high floor" },
    { id: "quietroom", value: "A quiet room" },
  ];

  return (
    <div className="flex flex-col gap-10 p-10">
      {/* Standard Request */}
      <div>
        <h2 className="text-xl font-semibold text-gray-600">
          Standard Request
        </h2>
        <p className="text-sm font-medium text-gray-600">
          These requests are not confirmed (Depend on the available room)
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <label
          htmlFor="earlycheckin"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="earlycheckin"
            name="earlycheckin"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          Early check-in
        </label>
        <label
          htmlFor="latecheckout"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="latecheckout"
            name="latecheckout"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          Late check-out
        </label>
        <label
          htmlFor="nonsmokingroom"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="nonsmokingroom"
            name="nonsmokingroom"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          Non-smoking-room
        </label>
        <label
          htmlFor="roomonhighfor"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="roomonhighfor"
            name="roomonhighfor"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          A room on the high floor
        </label>
        <label
          htmlFor="quietroom"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="quietroom"
            name="quietroom"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          A quiet room
        </label>
      </div>
      {/* End Standard Request */}
      {/* Special Request */}
      <div>
        <h2 className="text-xl font-semibold text-gray-600">Special Request</h2>
        <p className="text-sm font-medium text-gray-600">
          Additional charge may apply
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <label
          htmlFor="babycot"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="babycot"
            name="babycot"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          Baby cot (+THB 400)
        </label>
        <label
          htmlFor="airporttranfer"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="airporttranfer"
            name="airporttranfer"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          Airport transfer (+THB 200)
        </label>
        <label
          htmlFor="extrabed"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="extrabed"
            name="extrabed"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          Extra bed (+THB 500)
        </label>
        <label
          htmlFor="extrapillow"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="extrapillow"
            name="extrapillow"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          Extra pillows (+THB 100)
        </label>
        <label
          htmlFor="phonecharger"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="phonecharger"
            name="phonecharger"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          Phone chargers and adapters (+THB 100)
        </label>
        <label
          htmlFor="breakfast"
          className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
        >
          <Checkbox
            id="breakfast"
            name="breakfast"
            className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
          />
          Breakfast (+150)
        </label>
      </div>
      {/* End Special Request */}
      {/* Additional Request */}
      <div>
        <label htmlFor="additional">
          <p className="text-lg font-medium leading-loose text-gray-900 ">
            Additional Request
          </p>
          <textarea
            name="additional"
            id="additional"
            cols="30"
            rows="5"
            {...register("additional")}
            className="w-full p-3 text-lg border border-gray-400 rounded-sm outline-none resize-none focus:border-orange-500"
          ></textarea>
        </label>
      </div>
      {/* End Additional Request */}
      <div className="flex items-center justify-between">
        <LinkScroll
          activeClass="active"
          to="bookingroom"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <Button
            onClick={() => setStep(step - 1)}
            type="button"
            className={`${buttonVariants({
              variant: "ghost",
            })} text-lg justify-start`}
          >
            Back
          </Button>
        </LinkScroll>
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
            type="button"
            className="px-8 py-4 text-lg w-fit"
          >
            Next
          </Button>
        </LinkScroll>
      </div>
    </div>
  );
}
