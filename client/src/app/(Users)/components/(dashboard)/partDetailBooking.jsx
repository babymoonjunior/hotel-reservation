"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import getBookingDetails from "@/lib/getBookingDetail";
import useDateAndCurrencyHook from "@/hook/useDateAndCurrencyHook";

export default function DetailView({ bookingId, onBackClick }) {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { convertPrice } = useDateAndCurrencyHook();
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await getBookingDetails(bookingId);
        setDetailData(response.data);
        console.log(response);
        console.log(bookingId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching detail data:", error);
        setLoading(false);
      }
    };

    fetchDetailData();
  }, [bookingId]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  // Helper function to format total price
  const formatTotalPrice = (price) => {
    const formattedPrice = price.toFixed(2); // Ensures two decimal places
    return formattedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Function to format the credit card number or indicate cash payment
  const formatCreditCard = () => {
    const { payment_method, card_number } = detailData;

    if (payment_method === "creditcard" && card_number) {
      if (card_number.length === 16) {
        const maskedCardNumber = `*${card_number.substring(
          1,
          4
        )} ${card_number.substring(4, 8)} ${card_number.substring(
          8,
          12
        )} ${card_number.substring(12)}`;
        return maskedCardNumber;
      } else {
        // Handle cases where cardNumber exists but doesn't have the expected length
        return "Invalid Card"; // You can customize this message
      }
    } else if (payment_method === "cash") {
      return "Cash Payment";
    } else {
      // Handle other payment methods or null values
      return "N/A"; // You can customize this message
    }
  };

  return (
    <section>
      <div className="flex justify-start items-center left-[40px] bg-white w-full h-[80px] mb-4">
        {/* Back button */}
        <Image
          src={"/arrowdashboardback.svg"}
          width={24}
          height={24}
          onClick={onBackClick}
          className="hover:cursor-pointer ml-[60px]"
        />

        {/* Full Name */}
        <h1 className="text-2xl mx-[16px] font-semibold">
          {detailData ? detailData.customer_name : " "}
        </h1>
        <h2 className="text-2xl mx-[8px] ">
          {detailData ? detailData.roomtype : " "}
        </h2>
      </div>
      <div className="flex flex-col w-full h-full   bg-utility-bg text-gray-900 p-4 ">
        <div className="flex flex-col w-full h-full  justify-center items-center ">
          {loading ? (
            <p>Loading detail data...</p>
          ) : detailData ? (
            <div className="flex flex-col items-center  bg-utility-white w-full mt-[40px] mb-[61px] mx-[60px] h-full rounded-lg shadow-lg">
              {/* Display the fetched detail data */}
              <div className="flex flex-col w-full px-20">
                {" "}
                <div className="w-full h-[30px ] text-[#9AA1B9] mt-[40px] text-[20px] font-sans font-semibold">
                  <p>Customers Names</p>
                </div>
                <div className="w-full h-[24px ] mb-[40px] text-[16px] font-sans text-[#000]">
                  <p>{detailData.customer_name} </p>
                </div>
                <div className="w-full h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                  Guest(s)
                </div>
                <div className="w-full h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                  {detailData.guests}
                </div>
                <div className="w-full h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                  Room Type
                </div>
                <div className="w-full h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                  {detailData.roomtype}
                </div>
                <div className="w-full h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                  Amount
                </div>
                <div className="w-full h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                  {detailData.room}
                </div>
                <div className="w-full h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                  Bed Type
                </div>
                <div className="w-full h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                  {detailData.bed_type}
                </div>
                <div className="w-full h-[30px ] text-[#9AA1B9] text-[20px] font-sans font-semibold">
                  Check-in
                </div>
                <div className="w-full h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                  {detailData
                    ? formatDate(detailData.checkin_date)
                    : "Loading..."}
                </div>
                <div className="w-full h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                  Check-out
                </div>
                <div className="w-full h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                  {detailData
                    ? formatDate(detailData.checkout_date)
                    : "Loading..."}
                </div>
                <div className="w-full h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                  Stay (total)
                </div>
                <div className="w-full h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                  {detailData.night + " " + "night"}
                </div>
                <div className="w-full h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                  Booking date
                </div>
                <div className="w-full h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                  {" "}
                  {detailData
                    ? formatDate(detailData.created_at)
                    : "Loading..."}
                </div>
              </div>
              <div className="flex flex-col  w-full h-[500px] px-20    mb-[40px]  ">
                <div className="flex flex-col mb-[15px]  bg-gray-300 h-[480px] rounded-md w-full mt-[16px]">
                  <div className="flex  justify-end items-end w-full font-normal text-gray-600 h-[40px] my-[16px]">
                    <div className="flex  h-[24px]  mr-[16px]">
                      <p className="mx-[2px]">Payment</p>{" "}
                      <p className="mx-[2px]">
                        {detailData.payment_status === "paid"
                          ? `success`
                          : `${detailData.payment_status}`}
                      </p>
                      <p className="mx-[2px]">via</p>
                    </div>
                    <div
                      className={`flex ${
                        detailData.payment_method === "creditcard"
                          ? "pr-10 "
                          : "pr-10"
                      } h-[24px]`}
                      style={{
                        whiteSpace: "nowrap", // Prevent text from wrapping
                        overflow: "hidden", // Hide overflowing content
                      }}
                    >
                      <div className="pl-[2px] font-semibold  ">
                        {detailData.payment_method === "creditcard"
                          ? ` Credit Card - *${detailData.card_number.slice(
                              -3
                            )}`
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex px-10    items-center text-[16px]  w-full h-[48px] ">
                    <div className="flex items-center  justify-between px-1  w-full h-[24px]  ">
                      <div>{detailData.roomtype}</div>
                      <div className="font-semibold ">
                        {detailData
                          ? ` ${formatTotalPrice(detailData.room_price)}`
                          : "Loading..."}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start my-[12px] px-10   text-[16px]  w-full h-auto">
                    {detailData.special_request &&
                    detailData.special_request.length > 0 ? (
                      detailData.special_request.map((request, index) => (
                        <div
                          key={index}
                          className="flex items-center  justify-between w-full px-1 h-[24px] my-[12px]  "
                        >
                          <div>{request}</div>
                          <div className="font-bold">
                            {convertPrice(request)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No special requests available.</p>
                    )}
                  </div>

                  <div className="flex  justify-between items-center px-10    border-t  mt-auto  border-gray-300  w-full h-[54px] ">
                    <div className="flex  justify-between   w-full my-[20px]">
                      <div className="flex justify-end  h-[30px]   w-auto  text-[18px] ">
                        Total
                      </div>
                      <div className="flex justify-end   h-[30px]   w-auto font-semibold text-[20px]">
                        {detailData
                          ? `THB ${formatTotalPrice(detailData.total_price)}`
                          : "Loading..."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full h-full px-20 rounded-md   mb-[60px] ">
                <div className="flex flex-col mb-[15px] bg-gray-400 px-10 py-5 rounded-md w-full mt-[16px]">
                  <div className="w-[872px] h-[24px] mt-[16px] mb-[8px] ">
                    Additional Request
                  </div>
                  <div className="flex flex-col  items-start w-[872px]  h-full">
                    {detailData.standard_request &&
                    detailData.standard_request.length > 0 ? (
                      detailData.standard_request.map((request, index) => (
                        <div
                          key={index}
                          className="flex text-gray-700 justify-between w-[872px] h-full  items-center"
                        >
                          <div className="m-2">- {request}</div>
                          {/* <div className="font-bold">
                          THB {convertPrice(request)}
                        </div> */}
                        </div>
                      ))
                    ) : (
                      <p>No standard requests available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No detail data available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
