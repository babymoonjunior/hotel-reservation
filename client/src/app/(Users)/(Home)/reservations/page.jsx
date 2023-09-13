"use client";

import React, { useEffect, useState } from "react";
import BasicInformation from "./BasicInformation";
import SpecialRequest from "./SpecialRequest";
import PaymentMethod from "./PaymentMethod";
import Image from "next/image";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function page() {
  const [step, setStep] = useState(1);
  const methods = useForm({
    defaultValues: {
      fullname: "Kate Cho",
      email: "kate.cho@gmail.com",
      idnumber: "1111 11 1111 11111",
      standardRequest: [],
    },
  });
  const onSubmit = (data) => console.log(data);

  const formStep = () => {
    switch (step) {
      case 1:
        return <BasicInformation setStep={setStep} step={step} />;
      case 2:
        return <SpecialRequest setStep={setStep} step={step} />;
      case 3:
        return <PaymentMethod setStep={setStep} step={step} />;
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen p-32 bg-gray-200">
      <main>
        {/* Step */}
        <article id="bookingroom" className="w-full mx-auto max-w-7xl">
          <h1 className="font-serif font-medium leading-tight text-7xl -tracking-wider">
            Booking Room
          </h1>
          <div className="flex gap-16 py-10 font-sans font-semibold border-b border-gray-300">
            <div className="inline-flex items-center gap-4">
              <p
                className={`py-3 text-3xl leading-normal text-center  ${
                  step === 1
                    ? `bg-orange-500 text-white`
                    : `text-orange-500 bg-orange-100`
                }  rounded-md px-7 -tracking-widest`}
              >
                1
              </p>
              <p
                className={`text-xl leading-normal ${
                  step === 1 ? `text-orange-500` : `text-gray-900`
                } -tracking-widest`}
              >
                Basic Information
              </p>
            </div>
            <div className="inline-flex items-center gap-4">
              <p
                className={`py-3 text-3xl leading-normal text-center  ${
                  step === 2
                    ? `bg-orange-500 text-white`
                    : `text-orange-500 bg-orange-100`
                }  rounded-md px-7 -tracking-widest`}
              >
                2
              </p>
              <p
                className={`text-xl leading-normal ${
                  step === 2 ? `text-orange-500` : `text-gray-900`
                }  -tracking-widest`}
              >
                Special Request
              </p>
            </div>
            <div className="inline-flex items-center gap-4">
              <p
                className={`py-3 text-3xl leading-normal text-center  ${
                  step === 3
                    ? `bg-orange-500 text-white`
                    : `text-orange-500 bg-orange-100`
                }  rounded-md px-7 -tracking-widest`}
              >
                3
              </p>
              <p
                className={`text-xl leading-normal ${
                  step === 3 ? `text-orange-500` : `text-gray-900`
                } -tracking-widest`}
              >
                Payment Method
              </p>
            </div>
          </div>
        </article>
        {/* End Step */}
        {/* Form */}
        <FormProvider {...methods}>
          <article className="relative flex w-full gap-6 mx-auto my-10 max-w-7xl">
            {/* Form Detail */}
            <div className="w-full max-w-4xl bg-white rounded-sm ">
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {formStep()}
              </form>
            </div>
            {/* End Form Detail */}
            {/* Form Result */}
            <div className="sticky w-full max-w-sm rounded-sm top-28 h-fit">
              <div className="inline-flex items-center w-full gap-3 p-6 bg-green-800 rounded-t-sm">
                <Image
                  src={"/booking.svg"}
                  alt="booking"
                  width={100}
                  height={100}
                  className="w-6 h-6 "
                  style={{
                    filter:
                      "invert(68%) sepia(14%) saturate(447%) hue-rotate(94deg) brightness(88%) contrast(83%)",
                  }}
                />
                <p className="text-xl font-semibold text-white">
                  Booking Detail
                </p>
              </div>
              <div className="flex flex-col gap-10 p-6 text-white bg-green-600 rounded-b-sm">
                <div className="flex w-full">
                  <div className="flex-1 text-white">
                    <p className="mb-2 font-semibold">Check-in</p>
                    <p>After 2:00 PM</p>
                  </div>
                  <div className="flex-1 text-white">
                    <p className="mb-2 font-semibold">Check-out</p>
                    <p>Before 12:00 PM</p>
                  </div>
                </div>
                <div className="w-full">
                  <p>Th, 19 Oct 2022 - Fri, 20 Oct 2022</p>
                  <p>2 Guests</p>
                </div>
                <div>
                  <div className="pb-4 border-b border-gray-300">
                    <div className="flex items-center justify-between w-full mb-3">
                      <p className="text-green-300">
                        Superior Garden View Room
                      </p>
                      <p className="font-semibold">2,500.00</p>
                    </div>
                    <div className="flex items-center justify-between w-full mb-3">
                      <p className="text-green-300">Airport tranfer</p>
                      <p className="font-semibold">200.00</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full pt-6">
                    <p className="text-green-300">Total</p>
                    <p className="text-xl font-semibold">THB 2,300.00</p>
                  </div>
                </div>
              </div>
              <div className="p-4 mt-4 bg-gray-300 rounded-sm">
                <ul className="p-4 text-xs text-green-600 list-disc">
                  <li className="mb-5">
                    Cancel booking will get full refund if the cancelation
                    occurs before 24 hours of the check-in date.
                  </li>
                  <li>
                    Able to change check-in or check-out date booking within 24
                    hours of the booking date
                  </li>
                </ul>
              </div>
            </div>
            {/* End Form Result */}
          </article>
        </FormProvider>
        {/* End Form */}
      </main>
    </section>
  );
}
