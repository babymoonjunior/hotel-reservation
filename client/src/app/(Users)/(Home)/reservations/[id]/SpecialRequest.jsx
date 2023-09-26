"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link as LinkScroll } from "react-scroll";
import { useFormContext } from "react-hook-form";

export default function SpecialRequest({
  setStep,
  step,
  selectedRequests,
  setSelectedRequests,
  specialRequest,
  setSpecialRequest,
}) {
  const { register } = useFormContext();

  const standardRequests = [
    { id: "earlycheckin", value: "Early check-in" },
    { id: "latecheckout", value: "Late check-out" },
    { id: "nonsmokingroom", value: "Non-smoking-room" },
    { id: "roomonhighfor", value: "A room on the high floor" },
    { id: "quietroom", value: "A quiet room" },
  ];

  const specialRequests = [
    { id: "babycot", value: "Baby cot", price: "(+THB 400)" },
    { id: "airporttranfer", value: "Airport transfer", price: "(+THB 200)" },
    { id: "extrabed", value: "Extra bed", price: "(+THB 500)" },
    { id: "extrapillow", value: "Extra pillows", price: "(+THB 100)" },
    {
      id: "phonecharger",
      value: "Phone chargers and adapters",
      price: "(+THB 100)",
    },
    { id: "breakfast", value: "Breakfast", price: "(+THB 150)" },
  ];

  const handleCheck = (item) => {
    if (selectedRequests.includes(item.value)) {
      setSelectedRequests(
        selectedRequests.filter((value) => value !== item.value)
      );
    } else {
      setSelectedRequests([...selectedRequests, item.value]);
    }
  };

  const handleCheckSpecial = (item) => {
    if (specialRequest.includes(item.value)) {
      setSpecialRequest(specialRequest.filter((value) => value !== item.value));
    } else {
      setSpecialRequest([...specialRequest, item.value]);
    }
  };

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
        {standardRequests.map((item, index) => (
          <label
            key={index}
            htmlFor={item.id}
            className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
          >
            <input
              id={item.id}
              type="checkbox"
              onChange={() => handleCheck(item)}
              checked={selectedRequests.includes(item.value)}
              className="hidden w-6 h-6 border border-gray-400 rounded-sm appearance-none peer checked:border-orange-300 checked:bg-orange-500"
            />
            <Checkbox
              id={item.id}
              onCheckedChange={() => handleCheck(item)}
              checked={selectedRequests.includes(item.value)}
              className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
            />
            {item.value}
          </label>
        ))}
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
        {specialRequests.map((item, index) => (
          <label
            key={index}
            htmlFor={item.id}
            className="inline-flex items-center gap-3 text-lg leading-normal text-gray-700 cursor-pointer"
          >
            <Checkbox
              id={item.id}
              onCheckedChange={() => handleCheckSpecial(item)}
              checked={specialRequest.includes(item.value)}
              className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
            />
            {item.value} {item.price}
          </label>
        ))}
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
