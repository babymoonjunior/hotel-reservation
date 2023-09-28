"use client";

// CustomerBookingBoard.js
import { useEffect, useState } from "react";
import Image from "next/image";
import getBooking from "@/lib/getBooking";
import DetailView from "./partDetailBooking";

export default function CustomerBookingBoard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [order, setOrder] = useState("booking.checkin_date");
  const [sort, setSort] = useState("DESC");
  const [activeSortColumn, setActiveSortColumn] = useState(null); // New state variable

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

  const handleOnClickSort = (target) => {
    // If the clicked column is the same as the active column, toggle the sort direction
    if (activeSortColumn === target) {
      setSort((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    } else {
      // If a different column is clicked, set it as the active column and default to ascending sorting
      setActiveSortColumn(target);
      setSort((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    }
    setOrder(target);
  };

  useEffect(() => {
    const fetchBookingData = async (sort, order) => {
      try {
        const response = await getBooking(sort, order);
        // Format check-in and check-out dates
        const formattedData = response.data.map((item) => ({
          ...item,
          checkin_date: formatDate(item.checkin_date),
          checkout_date: formatDate(item.checkout_date),
        }));
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchBookingData(sort, order);
  }, [sort]); // Update data when the sorting changes

  const handleRowClick = (bookingId) => {
    setSelectedBookingId(bookingId);
  };

  const handleInputChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  function filteredData(data) {
    return data.filter((item) =>
      item.customer_name.toLowerCase().includes(searchTerm)
    );
  }

  return (
    <div className="bg-utility-bg h-screen">
      <div className="flex flex-col  w-full  text-gray-900 h-fit ">
        {loading ? (
          <p>Loading...</p>
        ) : selectedBookingId ? (
          <DetailView
            bookingId={selectedBookingId}
            onBackClick={() => setSelectedBookingId(null)}
          />
        ) : (
          <>
            <div className="flex justify-between items-center h-20 sticky top-0 px-32 py-4 bg-utility-white font-sans font-semibold text-xl text-gray-900 shadow ">
              <div className="w-[500px] ">
                <p className="font-sans font-bold text-[20px]  ">
                  Customers Booking
                </p>
              </div>
              <div className="flex justify-center items-center border border-gray-200 rounded-md   w-[320px] h-[48px]  pl-[5px] mr-[30px]">
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

            <div className="overflow-x-auto  rounded-md p-10  ">
              <table className="w-full divide-y divide-gray-300 rounded-lg border-collapse border-gray-200 overflow-hidden">
                <thead className="bg-gray-300  font-normal tracking-[-0.28px] text-[14px] h-[41px] text-gray-700 w-full">
                  {/* แก้ใส่ flex basis แทน */}
                  <tr className="flex flex-row w-full">
                    <th className="basis-4/6 py-2">
                      <button
                        onClick={() => {
                          handleOnClickSort("customer_name");
                        }}
                      >
                        Customer name
                        {activeSortColumn === "customer_name"
                          ? sort === "asc"
                            ? " ▲"
                            : " ▼"
                          : null}
                      </button>
                    </th>
                    <th className="basis-2/6 py-2">
                      <button
                        onClick={() => {
                          handleOnClickSort("guests");
                        }}
                      >
                        Guest(s)
                        {activeSortColumn === "guests"
                          ? sort === "asc"
                            ? " ▲"
                            : " ▼"
                          : null}
                      </button>
                    </th>
                    <th className="basis-4/6 py-2">
                      <button
                        onClick={() => {
                          handleOnClickSort("roomType");
                        }}
                      >
                        Room Type
                        {activeSortColumn === "roomType"
                          ? sort === "asc"
                            ? " ▲"
                            : " ▼"
                          : null}
                      </button>
                    </th>
                    <th className="basis-2/6 py-2">
                      <button
                        onClick={() => {
                          handleOnClickSort("room");
                        }}
                      >
                        {" "}
                        Amount
                        {activeSortColumn === "room"
                          ? sort === "asc"
                            ? " ▲"
                            : " ▼"
                          : null}
                      </button>
                    </th>
                    <th className="basis-3/6 py-2">
                      <button
                        onClick={() => {
                          handleOnClickSort("bed_type");
                        }}
                      >
                        Bed Type
                        {activeSortColumn === "bed_type"
                          ? sort === "asc"
                            ? " ▲"
                            : " ▼"
                          : null}
                      </button>
                    </th>
                    <th className="basis-3/6 py-2">
                      <button
                        onClick={() => {
                          handleOnClickSort("checkin_date");
                        }}
                      >
                        Check-in Date
                        {activeSortColumn === "checkin_date"
                          ? sort === "asc"
                            ? " ▲"
                            : " ▼"
                          : null}
                      </button>
                    </th>
                    <th className="basis-3/6 py-2">
                      <button
                        onClick={() => {
                          handleOnClickSort("checkout_date");
                        }}
                      >
                        Check-out Date
                        {activeSortColumn === "checkout_date"
                          ? sort === "asc"
                            ? " ▲"
                            : " ▼"
                          : null}
                      </button>
                    </th>
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
                      <td className="basis-2/6 py-[24px] text-center">
                        {item.guests}
                      </td>
                      <td className="basis-4/6 py-[24px]  text-center ">
                        {item.roomtype}
                      </td>
                      <td className="basis-2/6 py-[24px] text-center">
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
    </div>
  );
}
