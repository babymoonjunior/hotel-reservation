import { pool } from "../utils/db.js";
import { Router } from "express";

const roomsRouter = Router();

roomsRouter.get("/roomdetail", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM room_types");
    return res.status(200).json({
      data: result.rows,
      message: `The server successfully processed your request. Here's the data you asked for.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: `Oops, your request was malformed. The server couldn't understand what you're asking for.`,
    });
  }
});

roomsRouter.get("/roomdetail/:id", async (req, res) => {
  const room_typeId = req.params.id;
  try {
    const result = await pool.query(
      `select * from room_types where room_type_id = $1`,
      [room_typeId]
    );
    return res.status(200).json({
      data: result.rows[0],
      message: `The server successfully processed your request. Here's the data you asked for.`,
    });
  } catch (error) {
    return res.status(401).json({
      message: `Oops, your request was malformed. The server couldn't understand what you're asking for.`,
    });
  }
});

roomsRouter.get("/available-rooms", async (req, res) => {
  try {
    const { check_in_date, check_out_date, quantity } = req.query;
    const formatCheckIn = new Date(check_in_date);
    const formatCheckOut = new Date(check_out_date);
    const checkedIn = formatCheckIn.toISOString().split("T")[0];
    const checkedOut = formatCheckOut.toISOString().split("T")[0];

    const query = `
    SELECT
    room_types.room_type_id,
    room_types.roomtypetitle,
    room_types.description,
    room_types.fullprice,
    room_types.guests,
    room_types.discountprice,
    room_types.main_image,
    room_types.room_image,
    room_types.bedtype,
    room_types.roomarea,
    room_types.amenities,
    COUNT(rooms.room_id) AS available_rooms_count
    FROM
        rooms
    JOIN
        room_types ON rooms.room_type_id = room_types.room_type_id
    WHERE
        rooms.room_id NOT IN (
            SELECT
                room_id
            FROM
                reservations
            WHERE
                (checkin_date <= $2 AND checkout_date >= $1 AND reservation_status = 'confirmed')
        )
        AND room_types.guests >= $3
    GROUP BY
        room_types.roomtypetitle, 
        room_types.description, 
        room_types.fullprice, 
        room_types.main_image, 
        room_types.room_image,
        room_types.bedtype,
        room_types.roomarea,
        room_types.amenities,
        room_types.room_type_id,
        room_types.guests,
        room_types.discountprice
    `;

    const result = await pool.query(query, [checkedIn, checkedOut, quantity]);

    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

roomsRouter.get("/randomroom", async (req, res) => {
  try {
    const result = await pool.query(
      "select room_types.room_type_id,room_types.roomtypetitle,room_types.main_image from room_types order by random() limit 2 "
    );
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error querying the database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Booking
roomsRouter.post("/booking", async (req, res) => {
  const newBooking = { ...req.body };
  const payment_status =
    req.body.payment_method === "creditcard" ? "paid" : "pending";
  const charge_id = req.body.charge_id;
  try {
    // Insert Row to Booking Table
    const result = await pool.query(
      `
    INSERT INTO booking (profile_id, total_price, checkin_date, checkout_date, payment_method, room, special_request, standard_request, promotion,night,payment_status,additional,room_type_id)
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
        newBooking.promotion,
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
    INSERT INTO token_charge (charge_id,booking_id)
    VALUES ($1,$2)
    `,
        [charge_id, bookingId]
      );
    }

    return res.status(201).json({
      message: "Your request was successful, and a new resource was created.",
    });
  } catch (error) {
    console.log(error.message);
  }
});

export default roomsRouter;
