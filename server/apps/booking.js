import { pool } from "../utils/db.js";
import { Router } from "express";

const bookRouter = Router();

bookRouter.get("/booking-customers", async (req, res) => {
  try {
    // Use the PostgreSQL pool to query the database with a parameterized query
    const query = `
      SELECT
        booking.booking_id,
        booking.checkin_date,
        booking.checkout_date,
        booking.room, 
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

    const result = await pool.query(query);

    // Check if there are any results
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No booking data found.",
      });
    }

    // Execute the SQL query
    return res.status(200).json({
      data: result.rows,
      message:
        "The server successfully processed your request. Here's the data you asked for.",
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

bookRouter.get("/booking-customers/:id", async (req, res) => {
  const booking_Id = req.params.id;
  try {
    const result = await pool.query(
      `SELECT
        booking.booking_id,
        booking.checkin_date,
        booking.checkout_date,
        booking.total_price,
        profiles.full_name AS customer_name,
        rooms.room_type_id AS room_type_id,
        room_types.roomtypetitle AS roomType,
        room_types.bedtype AS bed_type,
        room_types.guests AS guests,
        booking.room,
        booking.night,
        booking.created_at,
        booking.payment_method,
        booking.payment_status,
        booking.standard_request,
        booking.special_request,
        booking.room_price,
        profiles.card_number,
        room_types.fullprice AS fullpriceroom,
        room_types.discountprice
      FROM
        booking
      INNER JOIN profiles ON booking.profile_id = profiles.id
      INNER JOIN room_types ON booking.room_type_id = room_types.room_type_id
      INNER JOIN reservations ON booking.booking_id = reservations.booking_id
      INNER JOIN rooms ON rooms.room_id = reservations.room_id
      WHERE booking.booking_id = $1
      ORDER BY booking.checkin_date DESC`,
      [booking_Id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }
    return res.status(200).json({
      data: result.rows[0],
      message: "Booking details retrieved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching booking details.",
      error: error.message,
    });
  }
});

export default bookRouter;
