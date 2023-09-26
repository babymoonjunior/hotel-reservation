"use client";

// CustomerBookingBoard.js
// CustomerBookingBoard.js

import { useEffect, useState } from "react";
import Image from "next/image";
import getBooking from "@/lib/getBooking";
import DetailView from "./partDetailBooking";

// Function to format date as "Th, 19 Oct 2022"
export default function CustomerBookingBoard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Function to format date as "Th, 19 Oct 2022"
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await getBooking();
        // Format check-in and check-out dates
        const formattedData = response.data.map((item) => ({
          ...item,
          checkin_date: formatDate(item.checkin_date),
          checkout_date: formatDate(item.checkout_date),
        }));
        // Check and format room data

        setData(formattedData);
        console.log(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  const handleRowClick = (bookingId) => {
    setSelectedBookingId(bookingId);
  };

  // Function to handle the input change event
  const handleInputChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter data based on search term for Customer Name only
  };

  function filteredData(data) {
    return data.filter((item) =>
      item.customer_name.toLowerCase().includes(searchTerm)
    );
  }

  return (
    <div className="flex flex-col  w-full bg-gray-300 text-gray-900 my-[16px] h-full ">
      {loading ? (
        <p>Loading...</p>
      ) : selectedBookingId ? (
        <DetailView
          bookingId={selectedBookingId}
          onBackClick={() => setSelectedBookingId(null)}
        />
      ) : (
        <>
          {/* Search input */}
          <div className="flex justify-between mb-[25px] bg-white py-2 ">
            <div className="flex items-center w-[500px]  pl-[100px]">
              <p className="font-sans font-bold text-[20px] mb-[10px]">
                Customers Booking
              </p>
            </div>
            <div className="flex justify-center items-center border border-gray-200 rounded-md  w-[320px] h-[48px] mb-[10px] pl-[5px] mr-[30px]">
              <div className="flex justify-end bg-white ">
                <div className="flex items-center pl-[16px  pr-[10px] focus:outline-none focus:border-blue-500">
                  <Image src={"/search.png"} width={24} height={24} />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="relative w-[250px] h-[24px] focus:outline-none"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto  rounded-md mx-[60px] mt-[40px] mb-[135px] ">
            <table className="w-full divide-y divide-gray-300 rounded-lg border-collapse border-gray-200 ">
              <thead className="bg-gray-200  font-normal tracking-[-0.28px] text-[14px] h-[41px] text-gray-700 w-full">
                {/* แก้ใส่ flex basis แทน */}
                <tr className="flex flex-row w-full">
                  <th className="basis-4/6 py-2">Customer name</th>
                  <th className="basis-1/6 py-2">Guest(s)</th>
                  <th className="basis-4/6 py-2">Room Type</th>
                  <th className="basis-1/6 py-2">Amount</th>
                  <th className="basis-3/6 py-2">Bed Type</th>
                  <th className="basis-3/6 py-2">Check-in Date</th>
                  <th className="basis-3/6 py-2">Check-out Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData(data).map((item, index) => (
                  // แก้ใส่ flex basis แทน ใช้ text center ในบางช่อง
                  <tr
                    key={index}
                    className={`font-sans flex flex-row text-[16px] border border-gray-200 bg-white
                    `}
                    onClick={() => handleRowClick(item.booking_id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="basis-4/6 py-[24px] pl-5">
                      {item.customer_name}
                    </td>
                    <td className="basis-1/6 py-[24px] text-center">
                      {item.guests}
                    </td>
                    <td className="basis-4/6 py-[24px]  text-center ">
                      {item.roomtype}
                    </td>
                    <td className="basis-1/6 py-[24px] text-center">
                      {item.room}
                    </td>
                    <td className="basis-3/6 py-[24px] text-center ">
                      {item.bed_type}
                    </td>
                    <td className="basis-3/6 py-[24px] text-center">
                      {item.checkin_date}
                    </td>
                    <td className="basis-3/6 py-[24px] text-center">
                      {item.checkout_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
