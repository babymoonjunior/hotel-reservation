"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CustomerBookingBoard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for testing
  const mockBookings = [
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 500,
      profile_id: 1,
      room_id: 1,
      guests: 2, // Added guests count
    },
    // Add more booking mock data here...
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 2,
      room_id: 2,
      guests: 3, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 900,
      profile_id: 3,
      room_id: 1,
      guests: 3, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 900,
      profile_id: 2,
      room_id: 3,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 900,
      profile_id: 4,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 4,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 3,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 4,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 500,
      profile_id: 5,
      room_id: 1,
      guests: 2, // Added guests count
    },
    // Add more booking mock data here...
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 4,
      room_id: 2,
      guests: 3, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 900,
      profile_id: 4,
      room_id: 1,
      guests: 3, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 900,
      profile_id: 5,
      room_id: 3,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 900,
      profile_id: 2,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 1,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 4,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 3,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 1,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 5,
      room_id: 2,
      guests: 2, // Added guests count
    },
    {
      checkin_date: "2023-09-15",
      checkout_date: "2023-09-18",
      total_price: 700,
      profile_id: 4,
      room_id: 2,
      guests: 2, // Added guests count
    },
  ];

  const mockProfiles = [
    {
      id: 1,
      full_name: "John Doe",
      email: "john@example.com",
      id_card: "1234567890123",
      birthdate: "1990-01-15",
      country: "USA",
      avatar_url: "avatar1.jpg",
    },
    // Add more profile mock data here...
    {
      id: 2,
      full_name: "John Cena",
      email: "john@example.com",
      id_card: "1234567890123",
      birthdate: "1990-01-15",
      country: "USA",
      avatar_url: "avatar1.jpg",
    },
    {
      id: 3,
      full_name: "Roman Reigns",
      email: "john@example.com",
      id_card: "1234567890123",
      birthdate: "1990-01-15",
      country: "USA",
      avatar_url: "avatar3.jpg",
    },
    {
      id: 4,
      full_name: "Mike Tyson",
      email: "john@example.com",
      id_card: "1234567890123",
      birthdate: "1980-01-15",
      country: "USA",
      avatar_url: "avatar4.jpg",
    },
    {
      id: 5,
      full_name: "Mike Iron",
      email: "john@example.com",
      id_card: "1234567890123",
      birthdate: "1980-01-15",
      country: "USA",
      avatar_url: "avatar4.jpg",
    },
  ];

  const mockRooms = [
    {
      id: 1,
      room_type_id: 1,
    },
    // Add more room mock data here...
    {
      id: 2,
      room_type_id: 2,
    },
    {
      id: 3,
      room_type_id: 2,
    },
    {
      id: 4,
      room_type_id: 1,
    },
    {
      id: 5,
      room_type_id: 1,
    },
    {
      id: 6,
      room_type_id: 1,
    },
    {
      id: 7,
      room_type_id: 1,
    },
    {
      id: 8,
      room_type_id: 1,
    },
    {
      id: 9,
      room_type_id: 2,
    },
    {
      id: 9,
      room_type_id: 1,
    },
    {
      id: 10,
      room_type_id: 1,
    },
  ];

  const mockRoomTypes = [
    {
      room_type_id: 1,
      roomtype_title: "Luxury Suite",
      bedtype: "King Size",
      guests: 2,
    },
    // Add more room type mock data here...
    {
      room_type_id: 2,
      roomtype_title: "Comfort Suite",
      bedtype: "Queen Size",
      guests: 3,
    },
    {
      room_type_id: 3,
      roomtype_title: "Dream Suite",
      bedtype: "Jack Size",
      guests: 3,
    },
    {
      room_type_id: 4,
      roomtype_title: "Sweet Suite",
      bedtype: "Jack Size",
      guests: 2,
    },
  ];

  useEffect(() => {
    // Simulate fetching data and joining (replace with actual fetch code when using Supabase)
    const fetchData = async () => {
      // Simulate a delay to mimic API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Join the mock data tables
      const joinedData = mockBookings.map((booking) => {
        const profile = mockProfiles.find((p) => p.id === booking.profile_id);
        const room = mockRooms.find((r) => r.id === booking.room_id);
        const roomType = mockRoomTypes.find(
          (rt) => rt.room_type_id === room.room_type_id
        );

        return {
          customer_name: profile.full_name,
          checkin_date: booking.checkin_date,
          checkout_date: booking.checkout_date,
          total_price: booking.total_price,
          bed_type: roomType.bedtype,
          guests: roomType.guests, // Guests count
          roomType: roomType.roomtype_title,
        };
      });

      setData(joinedData);
    };

    fetchData();
  }, []);

  // Filter the data based on the search term

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
    <div className="flex flex-col w-full  bg-gray-100 text-gray-900 p-4 rounded-lg shadow-lg">
      {/* Search input */}
      <div className="flex justify-between mx-[60px] mb-[25px] mt-[16px] ">
        <div className="w-[500px] pl-[100px]">
          <p className=" font-sans font-bold text-[20px]">Customers Booking</p>
        </div>
        <div className="flex justify-center  w-[320px] h-[48px] pl-[5px]  ">
          <div className="flex justify-end bg-white rounded-lg   py-[12px]">
            <div className="flex items-center  pl-[16px] pr-[10px] focus:outline-none focus:border-blue-500 ">
              <Image src={"/search.png"} width={24} height={24}></Image>
            </div>
            <input
              type="text"
              placeholder="  Search...   "
              className="relative w-[250px] h-[24px] focus:outline-none py-2   "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  mx-[60px] mt-[48px] mb-[135px]">
        <table className="min-w-full divide-y divide-gray-300 rounded-lg ">
          <thead className="bg-gray-200  text-[14px] mx-[16px] my-[10px] ">
            <tr>
              <th className="px-4 py-2">Customer Name</th>
              <th className="pr-3 pl-1 py-2">Guests(s)</th>
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
                className={`font-sans leading-[-32px] ${
                  index % 2 === 0 ? "bg-white" : "bg-white"
                }`}
              >
                <td className="px-4 py-2">{item.customer_name}</td>
                <td className="px-4 py-2">{item.guests}</td>
                <td className="px-4 py-2">{item.roomType}</td>
                <td className="px-4 py-2">{item.total_price}</td>
                <td className="px-4 py-2">{item.bed_type}</td>
                <td className="px-4 py-2">{item.checkin_date}</td>
                <td className="px-4 py-2">{item.checkout_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
