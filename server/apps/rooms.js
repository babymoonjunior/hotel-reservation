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

roomsRouter.get("/roomdetail/randomforsix", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM room_types ORDER BY random() LIMIT 6"
    );
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
            WHERE (
              checkin_date <= $1
              and checkout_date >= $1
              and reservation_status = 'confirmed'
            )
            or (
              checkin_date <= $2
              and checkout_date >= $2
              and reservation_status = 'confirmed'
            )
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

// Change Date APIs
roomsRouter.put("/updated-date", async (req, res) => {
  const updated_at = new Date();
  const { checkin_date, checkout_date, room_type_id, quantity, booking_id } =
    req.body;

  try {
    // Check room available
    const availableRoomsResult = await pool.query(
      `
      SELECT
        COUNT(rooms.room_id) AS available_rooms_count
      FROM
        rooms
      WHERE
        rooms.room_type_id = $1
        AND rooms.room_id NOT IN (
          SELECT
            room_id
          FROM
            reservations
          WHERE
            (
              checkin_date <= $2
              AND checkout_date >= $2
              AND reservation_status = 'confirmed'
            )
            OR (
              checkin_date <= $3
              AND checkout_date >= $3
              AND reservation_status = 'confirmed'
            )
        )
      `,
      [room_type_id, checkin_date, checkout_date]
    );

    const availableRoomCount =
      availableRoomsResult.rows[0].available_rooms_count;

    if (quantity > availableRoomCount) {
      return res.status(400).json({ message: `Rooms not available.` });
    }

    // Find available room IDs
    const findAvailableRoomsResult = await pool.query(
      `
      SELECT room_id
      FROM rooms
      WHERE room_type_id = $1 AND room_id NOT IN (
        SELECT room_id
        FROM reservations
        WHERE (
          checkin_date <= $2
          AND checkout_date >= $2
          AND reservation_status = 'confirmed'
        )
        OR (
          checkin_date <= $3
          AND checkout_date >= $3
          AND reservation_status = 'confirmed'
        )
      )
    `,
      [room_type_id, checkin_date, checkout_date]
    );

    const roomIds = findAvailableRoomsResult.rows.map((item) => item.room_id);

    // Find reservation IDs associated with the booking ID
    const findReservationIdsResult = await pool.query(
      `
      SELECT reservation_id
      FROM reservations
      WHERE booking_id = $1
      `,
      [booking_id]
    );

    const reservationIds = findReservationIdsResult.rows.map(
      (item) => item.reservation_id
    );

    // Update reservations
    for (let i = 0; i < reservationIds.length; i++) {
      await pool.query(
        `
        UPDATE reservations
        SET 
          room_id = $1,
          checkin_date = $2,
          checkout_date = $3,
          updated_at = $4
        WHERE
          reservation_id = $5
        `,
        [roomIds[i], checkin_date, checkout_date, updated_at, reservationIds[i]]
      );
    }

    // Update booking
    await pool.query(
      `
      UPDATE booking
      SET
        checkin_date = $1,
        checkout_date = $2,
        updated_at = $3
      WHERE
        booking_id = $4
      `,
      [checkin_date, checkout_date, updated_at, booking_id]
    );

    return res.json({ message: `Change Date updated successfully.` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}` });
  }
});

// Insert Room Type
roomsRouter.post("/create/roomtype", async (req, res) => {
  const {
    roomtypetitle,
    description,
    guests,
    bedtype,
    roomarea,
    main_image,
    room_image,
    amenities,
    fullprice,
    discountprice,
  } = req.body;
  try {
    const add = await pool.query(
      `
      INSERT INTO room_types (roomtypetitle, description, guests, bedtype, roomarea, main_image, room_image, amenities,fullprice,discountprice)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10)
      RETURNING room_type_id
    `,
      [
        roomtypetitle,
        description,
        guests,
        bedtype,
        roomarea,
        main_image,
        room_image,
        amenities,
        fullprice,
        discountprice,
      ]
    );

    const result = await pool.query(
      `select room_number from rooms order by room_number desc limit 1`
    );

    const roomTypeId = add.rows[0].room_type_id; // room_type_id
    const room_number = Number(result.rows[0].room_number); // room number that most values

    for (let i = 1; i < 6; i++) {
      await pool.query(
        `
        INSERT INTO rooms (room_number,room_type_id,room_status_id)
        VALUES ($1,$2,$3)
      `,
        [room_number + i, roomTypeId, 1]
      );
    }

    return res.status(201).json({
      message: "Your request was successful, and a new resource was created.",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      error: "An internal server error occurred.",
    });
  }
});

// Change Full Price
roomsRouter.put("/change/fullprice", async (req, res) => {
  const { fullprice, room_type_id } = req.body;
  const date = new Date();
  try {
    await pool.query(
      `
      UPDATE room_types
      SET
        fullprice = $1,
        updated_at = $2
      WHERE_
        room_type_id = $3
    `,
      [fullprice, date, room_type_id]
    );

    return res.status(201).json({
      message: "Your request was successful, and a new resource was updated.",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      error: "An internal server error occurred.",
    });
  }
});

//Change discountprice
roomsRouter.put("/change/discountprice", async (req, res) => {
  const { discountprice, room_type_id } = req.body;
  const date = new Date();
  try {
    await pool.query(
      `
      UPDATE room_types
      SET
      discountprice = $1,
      updated_at = $2
      WHERE
      room_type_id = $3
    `,
      [discountprice, date, room_type_id]
    );

    return res.status(201).json({
      message: "Your request was successful, and a new resource was updated.",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      error: "An internal server error occurred.",
    });
  }
});

export default roomsRouter;
