"use client";
import React, { useState } from "react";
import { HiOutlineCreditCard } from "react-icons/hi";
import { FaMoneyBillWave } from "react-icons/fa";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link as LinkScroll } from "react-scroll";
import Image from "next/image";

export default function PaymentMethod({
  setStep,
  step,
  paymentMethod,
  setPaymentMethod,
  supabaseData,
}) {
  function formatCreditCardNumber(cardNumber) {
    const cleanedNumber = cardNumber.replace(/\D/g, "");
    const formattedNumber = cleanedNumber.replace(/(\d{4})/g, "$1 ");
    return formattedNumber.trim();
  }
  return (
    <div className="flex flex-col gap-10 p-10">
      {/* payment method */}
      <ul className="grid w-full gap-6 md:grid-cols-2">
        <li className="rounded-lg shadow-lg">
          <input
            type="radio"
            id="creditcard"
            name="paymentmethod"
            value="creditcard"
            checked={paymentMethod === "creditcard"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="hidden peer"
            required
          />
          <label
            htmlFor="creditcard"
            className="inline-flex items-center justify-center w-full gap-3 py-6 text-gray-600 bg-white border border-gray-300 rounded-lg cursor-pointer px-7 peer-checked:border-orange-500 peer-checked:text-orange-500 hover:text-gray-600 hover:bg-orange-100"
          >
            <HiOutlineCreditCard className="w-8 h-8" />
            <div className="text-xl font-semibold">Credit Card</div>
          </label>
        </li>
        <li className="rounded-lg shadow-lg">
          <input
            type="radio"
            id="cash"
            name="paymentmethod"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="hidden peer"
          />
          <label
            htmlFor="cash"
            className="inline-flex items-center justify-center w-full h-full gap-3 py-6 text-gray-600 bg-white border border-gray-300 rounded-lg cursor-pointer px-7 peer-checked:border-orange-500 peer-checked:text-orange-500 hover:text-gray-600 hover:bg-orange-100 "
          >
            <FaMoneyBillWave className="w-8 h-8" />
            <div className="text-xl font-semibold">Cash</div>
          </label>
        </li>
      </ul>
      {/* End payment method */}
      {/* Credit Card Payment */}
      {paymentMethod === "creditcard" && (
        <>
          <h2 className="text-xl font-semibold text-gray-600">Credit Card</h2>
          <div className="flex flex-col gap-10">
            <div>
              <label htmlFor="creditcard">
                <p className="leading-normal text-gray-900">Card Number</p>
                <input
                  type="text"
                  id="creditcard"
                  name="creditcard"
                  value={formatCreditCardNumber(supabaseData[0].card_number)}
                  disabled
                  className="w-full p-3 leading-normal text-black rounded-sm disabled:bg-white disabled:border disabled:border-gray-400"
                />
              </label>
            </div>
            <div>
              <label htmlFor="cardowner">
                <p className="leading-normal text-gray-900">Card Owner</p>
                <input
                  type="text"
                  id="cardowner"
                  name="cardowner"
                  value={supabaseData[0].card_owner}
                  disabled
                  className="w-full p-3 leading-normal text-black rounded-sm disabled:bg-white disabled:border disabled:border-gray-400"
                />
              </label>
            </div>
            <div className="flex gap-10">
              <div className="flex-1">
                <label htmlFor="expirydate">
                  <p className="leading-normal text-gray-900">Expiry Date</p>
                  <input
                    type="text"
                    id="expirydate"
                    name="expirydate"
                    value={supabaseData[0].card_expire}
                    disabled
                    className="w-full p-3 leading-normal text-black rounded-sm disabled:bg-white disabled:border disabled:border-gray-400"
                  />
                </label>
              </div>
              <div className="flex-1">
                <label htmlFor="cvc">
                  <p className="leading-normal text-gray-900">CVC/CVV</p>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    value={supabaseData[0].card_cvc}
                    disabled
                    className="w-full p-3 leading-normal text-black rounded-sm disabled:bg-white disabled:border disabled:border-gray-400"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="py-6 border-t border-gray-300">
            <label htmlFor="promotion">
              <p className="leading-normal text-gray-900">Promotion Code</p>
              <input
                type="text"
                id="promotion"
                name="promotion"
                className="w-full p-3 leading-normal text-black border border-gray-400 rounded-sm outline-none focus:border-orange-500 disabled:bg-white disabled:border disabled:border-gray-400"
              />
            </label>
          </div>
        </>
      )}
      {/* End Credit Card Payment */}
      {paymentMethod === "cash" && (
        <div className="flex flex-col items-center justify-center h-full gap-10 px-6 py-8 bg-orange-200 rounded-lg">
          <div className="w-full max-w-sm">
            <Image
              src={"/logo.svg"}
              width={0}
              height={0}
              alt="neatly"
              className="w-full"
            />
          </div>
          <p className="w-full text-justify">
            If you wish to settle your payment using cash as your preferred mode
            of payment, we kindly request that you make the necessary cash
            payment in person upon your arrival at the physical location of the
            hotel. Your cooperation in this matter is greatly appreciated, and
            we look forward to ensuring a smooth and pleasant check-in process
            for your stay.
          </p>
        </div>
      )}
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
        <Button type="submit" className="px-8 py-4 text-lg w-fit">
          Confirm Booking
        </Button>{" "}
      </div>
    </div>
  );
}
