import { pool } from "../utils/db.js";

async function dataFromCheckIn() {
  try {
    const query = `
    SELECT profile_id,checkin_date,room_types.roomtypetitle
    FROM booking
    LEFT JOIN room_types ON booking.room_type_id = room_types.room_type_id
    WHERE checkin_date::DATE = CURRENT_DATE + 1;
    `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function dataFromCheckOut() {
  try {
    const query = `
    SELECT profile_id,checkout_date,room_types.roomtypetitle
    FROM booking
    LEFT JOIN room_types ON booking.room_type_id = room_types.room_type_id
    WHERE checkout_date::DATE = CURRENT_DATE + 1;
    `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function insertNotificationCheckin(data) {
  try {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const query = `
      INSERT INTO notification (profile_id, message)
      VALUES ($1, $2)
      `;
    for (let i = 0; i < data.length; i++) {
      const date = data[i].checkin_date.toLocaleDateString("en-US", options);
      const message = `Tomorrow is your check-in date with ${data[i].roomtypetitle} ${date}. We will wait for your arrival!`;
      await pool.query(query, [data[i].profile_id, message]);
    }
  } catch (error) {
    console.log(error);
  }
}

async function insertNotificationCheckOut(data) {
  try {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const query = `
        INSERT INTO notification (profile_id, message)
        VALUES ($1, $2)
        `;
    for (let i = 0; i < data.length; i++) {
      const date = data[i].checkout_date.toLocaleDateString("en-US", options);
      const message = `Today is your check-out date with ${data[i].roomtypetitle} ${date}. We hope you had a pleasant stay with us.`;
      await pool.query(query, [data[i].profile_id, message]);
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  dataFromCheckIn,
  dataFromCheckOut,
  insertNotificationCheckin,
  insertNotificationCheckOut,
};
