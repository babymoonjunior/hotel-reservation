import { pool } from "../utils/db.js";
import { Router } from "express";

const bookRouter = Router();

bookRouter.get("/booking-customers/:orderby/:sort", async (req, res) => {
  const orderBy = req.params.orderby;
  const sort = req.params.sort;
  try {
    // Use the PostgreSQL pool to query the database with a parameterized query
    const query = `
      SELECT
        booking.booking_id,
        booking.checkin_date,
        booking.checkout_date,
        booking.room, 
        profiles.full_name AS customer_name,
        room_types.roomtypetitle AS roomType,
        room_types.bedtype AS bed_type,
        room_types.guests AS guests
      FROM
        booking
      INNER JOIN profiles ON booking.profile_id = profiles.id
      INNER JOIN room_types ON booking.room_type_id = room_types.room_type_id
      ORDER BY ${orderBy} ${sort};
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

// Booking
bookRouter.post("/reservation", async (req, res) => {
  const newBooking = { ...req.body };
  const payment_status =
    req.body.payment_method === "creditcard" ? "paid" : "pending";
  const charge_id = req.body.charge_id;
  try {
    // Insert Row to Booking Table
    const result = await pool.query(
      `
    INSERT INTO booking (profile_id, total_price, checkin_date, checkout_date, payment_method, room, special_request, standard_request, room_price,night,payment_status,additional,room_type_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13)
    RETURNING booking_id
    `,
      [
        newBooking.profile_id,
        newBooking.total_price,
        newBooking.checkin_date,
        newBooking.checkout_date,
        newBooking.payment_method,
        newBooking.room,
        newBooking.special_request,
        newBooking.standard_request,
        newBooking.room_price,
        newBooking.night,
        payment_status,
        newBooking.additional,
        newBooking.room_type_id,
      ]
    );

    const bookingId = result.rows[0].booking_id;

    // After Insert Booking
    // Find Room Available
    const findRoomAvailable = await pool.query(
      `
      SELECT room_id
      FROM rooms
      WHERE room_type_id = $1 AND room_id NOT IN (
        SELECT room_id
        FROM reservations
        WHERE (
          checkin_date <= $2
          and checkout_date >= $2
          and reservation_status = 'confirmed'
        )
        or (
          checkin_date <= $3
          and checkout_date >= $3
          and reservation_status = 'confirmed'
        )
      )
    `,
      [
        newBooking.room_type_id,
        newBooking.checkin_date,
        newBooking.checkout_date,
      ]
    );
    const resultFindRoomAvailable = findRoomAvailable.rows;
    const roomIds = resultFindRoomAvailable.map((item) => item.room_id);

    // Insert Row to Reservation
    for (let i = 0; i < newBooking.room; i++) {
      await pool.query(
        `
      INSERT INTO reservations (room_id, checkin_date, checkout_date, booking_id,reservation_status)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `,
        [
          roomIds[i],
          newBooking.checkin_date,
          newBooking.checkout_date,
          bookingId,
          "confirmed",
        ]
      );
    }

    if (charge_id) {
      await pool.query(
        `
    INSERT INTO token_charge (charge_id,booking_id,total_price)
    VALUES ($1,$2,$3)
    `,
        [charge_id, bookingId, newBooking.total_price]
      );
    }

    return res.status(201).json({
      message: "Your request was successful, and a new resource was created.",
    });
  } catch (error) {
    console.log(error.message);
  }
});

export default bookRouter;
