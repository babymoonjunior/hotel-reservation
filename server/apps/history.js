import { pool } from "../utils/db.js";
import { Router } from "express";

const historyRouter = Router();

historyRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM booking LEFT JOIN room_types ON booking.room_type_id = room_types.room_type_id"
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

historyRouter.get("/:id", async (req, res) => {
  const profile_Id = req.params.id;
  try {
    const result = await pool.query(
      `select * FROM booking LEFT JOIN room_types ON booking.room_type_id = room_types.room_type_id where profile_id = $1`,
      [profile_Id]
    );
    return res.status(200).json({
      data: result.rows,
      message: `The server successfully processed your request. Here's the data you asked for.`,
    });
  } catch (error) {
    return res.status(401).json({
      message: `Oops, your request was malformed. The server couldn't understand what you're asking for.`,
    });
  }
});

historyRouter.put("/cancellation/:id", async (req, res) => {
  const booking_Id = req.params.id;
  const newUpdate = { ...req.body };
  try {
    // ส่งคำสั่ง SQL ไปยัง PostgreSQL เพื่ออัปเดตข้อมูล
    const result = await pool.query('UPDATE booking SET payment_status= $1, updated_at= NOW() WHERE booking_id = $2 RETURNING payment_status', [
      newUpdate.payment_status,
      booking_Id,
    ]);
    console.log(result);
    res.json({ message: 'ข้อมูลถูกอัปเดตเรียบร้อยแล้ว' });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
    res.status(500).json({ error: 'มีข้อผิดพลาดเกิดขึ้น' });
  }
});




export default historyRouter;
