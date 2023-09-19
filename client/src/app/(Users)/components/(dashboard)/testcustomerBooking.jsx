"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CustomerBookingBoard() {
  const [data, setData] = useState([]);

  // Replace with your actual Supabase credentials

  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("booking")
          .select(
            `
            booking.id as booking_id,
            booking.checkin_date,
            booking.checkout_date,
            booking.total_price,
            profiles.full_name as customer_name,
            room_types.bedtype as bed_type
          `
          )
          .from("profiles")
          .select("full_name")
          .from("reservations")
          .select("booking_id")
          .from("rooms")
          .select("room_type_id")
          .from("room_types")
          .select("roomtype_title", "bedtype")
          .eq("booking.id", "reservations.booking_id")
          .eq("booking.room_id", "rooms.id")
          .eq("room_types.room_type_id", "rooms.room_type_id");

        if (error) {
          console.error("Error fetching data:", error.message);
          return;
        }

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-[1200px] h-[1024px] bg-gray-100 text-gray-300 shrink-0">
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Total Price</th>
            <th>Bed Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.booking_id}>
              <td>{item.booking_id}</td>
              <td>{item.customer_name}</td>
              <td>{item.checkin_date}</td>
              <td>{item.checkout_date}</td>
              <td>{item.total_price}</td>
              <td>{item.bed_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// export default function CustomerBookingBoard() {
//   const [data, setData] = useState([]);

//   const supabase = createClientComponentClient();
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase
//         .from("booking")
//         .select(
//           `
//           booking.id as booking_id,
//           booking.checkin_date,
//           booking.checkout_date,
//           booking.total_price,
//           profiles.full_name as customer_name,
//           room_types.bedtype as bed_type
//         `
//         )
//         .join("profiles", { foreignKey: "profile_id" })
//         .join("reservations", { foreignKey: "booking_id" })
//         .join("rooms", { foreignKey: "room_id" })
//         .join("room_types", { foreignKey: "room_type_id" });

//       if (error) {
//         console.error("Error fetching data:", error.message);
//         return;
//       }

//       setData(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="flex w-[1200px] h-[1024px] bg-gray-100 text-gray-300 shrink-0">
//       <table>
//         <thead>
//           <tr>
//             <th>Booking ID</th>
//             <th>Customer Name</th>
//             <th>Check-in Date</th>
//             <th>Check-out Date</th>
//             <th>Total Price</th>
//             <th>Bed Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.booking_id}>
//               <td>{item.booking_id}</td>
//               <td>{item.customer_name}</td>
//               <td>{item.checkin_date}</td>
//               <td>{item.checkout_date}</td>
//               <td>{item.total_price}</td>
//               <td>{item.bed_type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
