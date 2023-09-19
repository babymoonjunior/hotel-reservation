import { pool } from "../utils/db.js";
import { Router } from "express";

const bookRouter = Router();

bookRouter.get("/booking-customers", async (req, res) => {
  try {
    // Use the PostgreSQL pool to query the database
    const client = await pool.connect();

    // SQL query to fetch booking data with joins
    const query = `
      SELECT
  booking.booking_id,
  booking.checkin_date,
  booking.checkout_date,
  booking.total_price,
  profiles.full_name AS customer_name,
  rooms.room_type_id AS room_type_id,
  room_types.roomtypetitle AS roomType,
  room_types.bedtype AS bed_type,
  room_types.guests AS guests
FROM
  booking
INNER JOIN profiles ON booking.profile_id = profiles.id
INNER JOIN room_types ON booking.room_type_id = room_types.room_type_id
INNER JOIN reservations ON booking.booking_id = reservations.booking_id
INNER JOIN rooms ON rooms.room_id = reservations.room_id 
ORDER BY booking.checkin_date DESC;

    `;

    // Execute the SQL query
    const result = await client.query(query);

    // Release the client back to the pool
    client.release();

    // Send the fetched data as a JSON response
    res.json({ data: result.rows });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default bookRouter;
