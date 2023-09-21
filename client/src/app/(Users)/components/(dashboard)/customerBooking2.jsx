"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import getBooking from "@/lib/getBooking";

export default function CustomerBookingBoard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
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
  }, []);

  const filteredData = data.filter((item) => {
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (typeof value === "number") {
        return value.toString().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  });

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleBackButtonClick = () => {
    setSelectedRow(null);
  };

  return (
    <div className="flex flex-col w-full bg-gray-100 text-gray-900 p-4 rounded-lg shadow-lg">
      {loading ? (
        <p>Loading...</p>
      ) : selectedRow ? (
        // Detail view when a row is selected
        <div>
          <button onClick={handleBackButtonClick}>Back to Dashboard</button>
          <div>
            <p>Customer Name: {selectedRow.customer_name}</p>
            <p>Guest(s): {selectedRow.guests}</p>
            <p>Room Type: {selectedRow.roomtype}</p>
            <p>Total Price: {selectedRow.total_price}</p>
            <p>Bed Type: {selectedRow.bed_type}</p>
            <p>Check-in Date: {selectedRow.checkin_date}</p>
            <p>Check-out Date: {selectedRow.checkout_date}</p>
            {/* Add more details here */}
          </div>
        </div>
      ) : (
        // Dashboard view
        <>
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
                    onClick={() => handleRowClick(item)}
                    style={{ cursor: "pointer" }}
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
