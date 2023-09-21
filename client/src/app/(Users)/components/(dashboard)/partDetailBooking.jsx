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
        {/* <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={onBackClick}
        >
          Back to Dashboard
        </button> */}
        {/* Full Name */}
        <h1 className="text-2xl mx-[16px] font-semibold">
          {detailData ? detailData.customer_name : " "}
        </h1>
        <h2 className="text-2xl mx-[8px] ">
          {detailData ? detailData.roomtype : " "}
        </h2>
      </div>
      <div className="flex flex-col w-full h-[1489px]  bg-gray-300 text-gray-900 p-4 ">
        <div className="flex flex-col w-full h-full  justify-center items-center ">
          {loading ? (
            <p>Loading detail data...</p>
          ) : detailData ? (
            <div className="flex flex-col items-center bg-gray-100 w-[1080px] mt-[40px] mb-[61px] mx-[60px] h-[1388px] rounded-lg shadow-lg">
              {/* Display the fetched detail data */}

              <div className="w-[880px] h-[30px ] text-[#9AA1B9] mt-[40px] text-[20px] font-sans font-semibold">
                <p>Customers Names</p>
              </div>
              <div className="w-[880px] h-[24px ] ite  mb-[40px] text-[16px] font-sans text-[#000]">
                <p>{detailData.customer_name} </p>
              </div>
              <div className="w-[880px] h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                Guest(s)
              </div>
              <div className="w-[880px] h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                {detailData.guests}
              </div>
              <div className="w-[880px] h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                Room Type
              </div>
              <div className="w-[880px] h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                {detailData.roomtype}
              </div>
              <div className="w-[880px] h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                Amount
              </div>
              <div className="w-[880px] h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                {detailData.room}
              </div>
              <div className="w-[880px] h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                Bed Type
              </div>
              <div className="w-[880px] h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                {detailData.bed_type}
              </div>
              <div className="w-[880px] h-[30px ] text-[#9AA1B9] text-[20px] font-sans font-semibold">
                Check-in
              </div>
              <div className="w-[880px] h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                {detailData
                  ? formatDate(detailData.checkin_date)
                  : "Loading..."}
              </div>
              <div className="w-[880px] h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                Check-out
              </div>
              <div className="w-[880px] h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                {detailData
                  ? formatDate(detailData.checkout_date)
                  : "Loading..."}
              </div>
              <div className="w-[880px] h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                Stay (total)
              </div>
              <div className="w-[880px] h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                {detailData.night + " " + "night"}
              </div>
              <div className="w-[880px] h-[30px ]  text-[#9AA1B9] text-[20px] font-sans font-semibold">
                Booking date
              </div>
              <div className="w-[880px] h-[24px ]  mb-[40px] text-[16px] font-sans text-[#000]">
                {" "}
                {detailData ? formatDate(detailData.created_at) : "Loading..."}
              </div>
              <div className="flex flex-col  justify-center items-center w-[920px] h-[290px] rounded-md bg-gray-300 mb-[40px]  ">
                <div className="flex flex-col items-center  justify-center h-[192px] w-[872px] mt-[16px]">
                  <div className="flex items-end  justify-end w-[872px] h-[40px] my-[16px]">
                    <div className="flex items-end justify-end w-[300px] h-[24px]  mr-[16px]">
                      <p className="mx-[2px]">Payment</p>{" "}
                      <p className="mx-[2px]">{detailData.payment_status}</p>
                      <p className="mx-[2px]">via</p>
                    </div>
                    <div
                      className={`flex ${
                        detailData.payment_method === "creditcard"
                          ? "w-[250px]"
                          : "w-[50px]"
                      } h-[24px]`}
                    >
                      <div className="px-[2px] font-semibold">
                        {detailData.payment_method}{" "}
                      </div>
                      <div className="pl-[8px]">
                        {detailData.payment_method === "creditcard"
                          ? ` Credit Card - *${detailData.card_number.slice(
                              -3
                            )}`
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex  justify-between items-center text-[16px]  w-[872px] h-[48px] ">
                    <div className="w-[220px] h-[24px]">
                      {detailData.roomtype}
                    </div>
                    <div className=" font-semibold ">
                      <div className="">
                        {detailData
                          ? `THB ${detailData.promotion}`
                          : "Loading..."}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start my-[12px]  text-[16px]  w-[872px] h-auto">
                    {detailData.special_request &&
                    detailData.special_request.length > 0 ? (
                      detailData.special_request.map((request, index) => (
                        <div
                          key={index}
                          className="flex  justify-between w-[872px] h-[24px] my-[12px]  items-center"
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
                  <div className="flex  justify-between items-center text-[16px] my-[12px w-[872px] h-[48px]">
                    <div className=""></div>
                    <div className=""></div>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t  mt-[12px] border-gray-300  w-[872px] h-[54px] ">
                  <div className="h-[30px] w-[167px]  mt-[10px]">Total</div>
                  <div className="flex justify-end h-[30px] w-[164px] font-semibold text-[20px]">
                    {detailData
                      ? `THB ${formatTotalPrice(detailData.total_price)}`
                      : "Loading..."}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-[920px] h-[full]  bg-gray-500 mb-[60px] ">
                <div className="w-[872px] h-[24px] mt-[16px] mb-[8px] ">
                  Additional Request
                </div>
                <div className="flex flex-col  items-start w-[872px]  h-full">
                  {detailData.standard_request &&
                  detailData.standard_request.length > 0 ? (
                    detailData.standard_request.map((request, index) => (
                      <div
                        key={index}
                        className="flex text-gray-700  justify-between w-[872px] h-full  items-center"
                      >
                        <div>{request}</div>
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
          ) : (
            <p>No detail data available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
// <p>Booking ID: {detailData.booking_id}</p>
//         <p>Check-in Date: {detailData.checkin_date}</p>
//         <p>Checkout Date: {detailData.checkout_date}</p>
//         <p>Total Price: {detailData.total_price}</p>
//         <p>Customer Name: {detailData.customer_name}</p>
//         <p>Room Type ID: {detailData.room_type_id}</p>
//         <p>Room Type: {detailData.roomtype}</p>
//         <p>Bed Type: {detailData.bed_type}</p>
//         <p>Guests: {detailData.guests}</p>
//         <p>Room: {detailData.room}</p>
//         <p>Night: {detailData.night}</p>
//         <p>Created At: {detailData.created_at}</p>
//         <p>Payment Method: {detailData.payment_method}</p>
//         <p>Payment Status: {detailData.payment_status}</p>
//         {/* Add more fields as needed */}
