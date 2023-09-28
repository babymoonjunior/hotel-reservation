import { pool } from "../utils/db.js";
import { Router } from "express";

const notification = Router();

// Change Unread To Read
notification.put("/read", async (req, res) => {
  const { profile_id } = req.body;
  try {
    await pool.query(
      `
    UPDATE notification
    SET status = 'read'
    WHERE profile_id = $1
    `,
      [profile_id]
    );
    return res
      .status(200)
      .json({ message: "Notification status updated to read." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating notification status." });
  }
});

export default notification;
