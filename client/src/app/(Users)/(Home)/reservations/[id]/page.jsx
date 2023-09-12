"use client";
import React, { useEffect, useState } from "react";
import BasicInformation from "./BasicInformation";
import SpecialRequest from "./SpecialRequest";
import PaymentMethod from "./PaymentMethod";
import Image from "next/image";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useSearchContext } from "@/context/searchRoom";
import axios from "axios";

export default function page({ params }) {
  const [step, setStep] = useState(1);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [specialRequest, setSpecialRequest] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("creditcard");
  const { checkedIn, checkedOut, rooms } = useSearchContext();
  const [roomDetail, setRoomDetail] = useState([]);
  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [night, setNight] = useState(1);

  const methods = useForm({
    defaultValues: {
      profile_id: "b5b23146-339a-4be9-9e6c-7c2b320b4d84",
      total_price: totalPrice,
      standardRequest: selectedRequests,
      specialRequest: specialRequest,
      checkin_date: checkedIn,
      checkout_date: checkedOut,
      rooms: rooms,
      room_type_id: params.id,
      payment_method: paymentMethod,
      promotion: null,
    },
  });

  const getData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/rooms/roomdetail/${params.id}`
      );
      setRoomDetail(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getPrice =
      roomDetail.discountprice !== ""
        ? roomDetail.discountprice
        : roomDetail.fullprice;
    setRoomPrice(parseFloat(getPrice));
  }, [roomDetail]);

  const onSubmit = async (data) => {
    data.standardRequest = selectedRequests;
    data.specialRequest = specialRequest;
    data.total_price = totalPrice;
    data.payment_method = paymentMethod;
    try {
      await axios.post(`http://localhost:4000/rooms/booking`, {
        profile_id: data.profile_id,
        total_price: data.total_price,
        checkin_date: data.checkin_date,
        checkout_date: data.checkout_date,
        payment_method: data.payment_method,
        room: data.rooms,
        special_request: data.specialRequest,
        standard_request: data.standardRequest,
        promotion: data.promotion,
        room_type_id: data.room_type_id,
      });

      alert(`booking successfull`);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const additional = useWatch({
    control: methods.control,
    name: "additional",
  });

  const formStep = () => {
    switch (step) {
      case 1:
        return <BasicInformation setStep={setStep} step={step} />;
      case 2:
        return (
          <SpecialRequest
            setStep={setStep}
            step={step}
            selectedRequests={selectedRequests}
            setSelectedRequests={setSelectedRequests}
            specialRequest={specialRequest}
            setSpecialRequest={setSpecialRequest}
          />
        );
      case 3:
        return (
          <PaymentMethod
            setStep={setStep}
            step={step}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        );
      default:
        return null;
    }
  };

  const convertPrice = (request) => {
    switch (request) {
      case "Baby cot":
        return "400.00";
      case "Airport transfer":
        return "200.00";
      case "Extra bed":
        return "500.00";
      case "Extra pillows":
        return "100.00";
      case "Phone chargers and adapters":
        return "100.00";
      case "Breakfast":
        return "150.00";
      default:
        return "0.00";
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (isNaN(roomPrice)) {
        setTotalPrice("Invalid room price");
        return;
      }

      const specialRequestTotal = specialRequest.reduce((total, request) => {
        const requestPrice = parseFloat(convertPrice(request));
        if (!isNaN(requestPrice)) {
          return total + requestPrice;
        }
        return total;
      }, 0);

      const totalPrice = roomPrice * rooms + specialRequestTotal;
      setTotalPrice(totalPrice.toFixed(2));
    };

    calculateTotalPrice();
  }, [roomPrice, specialRequest]);

  useEffect(() => {
    const calculateDateDifferent = () => {
      const date1 = new Date(checkedIn);
      const date2 = new Date(checkedOut);
      const differenceInMilliseconds = date2 - date1;

      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      setNight(differenceInDays);
      return differenceInDays;
    };
    calculateDateDifferent();
  }, []);

  const convertDate = (dateInput) => {
    var date = new Date(dateInput);
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayOfWeek = dayNames[date.getUTCDay()];
    var dayOfMonth = date.getUTCDate();
    var month = monthNames[date.getUTCMonth()];
    var year = date.getUTCFullYear();
    var formattedDate =
      dayOfWeek + ", " + dayOfMonth + " " + month + " " + year;
    return formattedDate;
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
                  <p>
                    {convertDate(checkedIn)} - {convertDate(checkedOut)}
                  </p>
                  <p>{roomDetail.guests} Guests</p>
                </div>
                <div>
                  <div className="pb-4 border-b border-gray-300">
                    <div className="flex items-start justify-between w-full mb-3">
                      <p className="text-green-300">
                        Superior Garden View Room
                        <span>
                          <br />({rooms} Room x {night} Night)
                        </span>
                      </p>
                      <p className="font-semibold">{roomPrice}</p>
                    </div>
                    {specialRequest.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between w-full mb-3"
                        >
                          <p className="text-green-300"> {item} </p>
                          <p className="font-semibold">{convertPrice(item)}</p>
                        </div>
                      );
                    })}
                    {selectedRequests.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between w-full mb-3"
                        >
                          <p className="text-green-300"> {item} </p>
                          <p className="font-semibold">{convertPrice(item)}</p>
                        </div>
                      );
                    })}
                    {additional !== undefined && (
                      <div className="flex items-center w-full mb-3">
                        <p className="text-green-300"> {additional} </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full pt-6">
                    <p className="text-green-300">Total</p>
                    <p className="text-xl font-semibold">THB {totalPrice}</p>
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
