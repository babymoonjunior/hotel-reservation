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
                (checkin_date <= $2 AND checkout_date >= $1)
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

    const result = await pool.query(query, [
      check_in_date,
      check_out_date,
      quantity,
    ]);

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

export default roomsRouter;
