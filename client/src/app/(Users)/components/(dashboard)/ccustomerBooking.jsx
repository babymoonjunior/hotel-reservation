"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import getBooking from "@/lib/getBooking";

export default function CustomerBookingBoard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use an asynchronous function to fetch the booking data
    const fetchBookingData = async () => {
      try {
        const response = await getBooking();
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const filteredData = data.filter((item) => {
    // Check if the search term is found in any of the item values
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        // For string values, perform case-insensitive search
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (typeof value === "number") {
        // For numbers, convert to string and then search
        return value.toString().includes(searchTerm.toLowerCase());
      }
      return false; // Ignore non-string and non-number values
    });
  });

  return (
    <div className="flex flex-col w-full bg-gray-100 text-gray-900 p-4 rounded-lg shadow-lg">
      {loading ? (
        // Display a loading message or spinner while data is being fetched
        <p>Loading...</p>
      ) : (
        <>
          {/* Search input */}
          <div className="flex justify-between mx-[60px] mb-[25px] mt-[16px]">
            <div className="w-[500px] pl-[100px]">
              <p className="font-sans font-bold text-[20px]">
                Customers Booking
              </p>
            </div>
            <div className="flex justify-center w-[320px] h-[48px] pl-[5px]">
              <div className="flex justify-end bg-white rounded-lg py-[12px]">
                <div className="flex items-center pl-[16px] pr-[10px] focus:outline-none focus:border-blue-500">
                  <Image src={"/search.png"} width={24} height={24} />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="relative w-[250px] h-[24px] focus:outline-none py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mx-[60px] mt-[48px] mb-[135px]">
            <table className="min-w-full divide-y divide-gray-300 rounded-lg">
              <thead className="bg-gray-200 text-[14px] mx-[16px] my-[10px]">
                <tr>
                  <th className="px-4 py-2">Customer Name</th>
                  <th className="pr-3 pl-1 py-2">Guest(s)</th>
                  <th className="px-4 py-2">Room Type</th>
                  <th className="px-4 py-2">Total Price</th>
                  <th className="px-4 py-2">Bed Type</th>
                  <th className="px-4 py-2">Check-in Date</th>
                  <th className="px-4 py-2">Check-out Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className={`font-sans ${
                      index % 2 === 0 ? "bg-white" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2">{item.customer_name}</td>
                    <td className="px-4 py-2">{item.guests}</td>
                    <td className="px-4 py-2">{item.roomtype}</td>
                    <td className="px-4 py-2">{item.total_price}</td>
                    <td className="px-4 py-2">{item.bed_type}</td>
                    <td className="px-4 py-2">{item.checkin_date}</td>
                    <td className="px-4 py-2">{item.checkout_date}</td>
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
