import { pool } from "../utils/db.js";
import { Router } from "express";
import Omise from "omise";

const paymentRouter = Router();

const omise = Omise({
  secretKey: process.env.Secret_Key,
  omiseVersion: "2015-09-10",
  publicKey: process.env.Public_Key,
});

paymentRouter.post("/create-charge", async (req, res) => {
  const {
    name,
    city,
    number,
    expiration_month,
    expiration_year,
    security_code,
    amount,
  } = req.body;

  try {
    // Create Token Omise Card
    const token = await omise.tokens.create({
      card: {
        name,
        city,
        postal_code: 50000,
        number,
        expiration_month,
        expiration_year,
        security_code,
      },
    });

    const getToken = token.id;

    if (!getToken) {
      throw new Error("Error creating token");
    }

    if (getToken === undefined || getToken === null) {
      return res.json({ message: `error on getToken process`, error: error });
    }
    //Create Charge
    const charge = await omise.charges.create({
      amount: amount * 100,
      currency: "thb",
      card: getToken,
    });

    const charge_id = charge.id;

    if (!charge_id) {
      throw new Error("Error creating charge");
    }

    return res
      .status(200)
      .json({ chargeId: charge_id, message: `Payment Succesfully` });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Payment failed", message: error.message });
  }
});

paymentRouter.post("/refund", async (req, res) => {
  const { charge_id, total_price, booking_id } = req.body;
  const updated_at = new Date();
  try {
    await pool.query(
      `
    UPDATE booking
    SET 
      payment_status = 'refunded',
      updated_at = $1
    WHERE booking_id = $2
    `,
      [updated_at, booking_id]
    );

    await pool.query(
      `
    UPDATE reservations
    SET 
      reservation_status = 'canceled',
      updated_at = $1
    WHERE booking_id = $2
    `,
      [updated_at, booking_id]
    );

    const charge = await omise.charges.createRefund(charge_id, {
      amount: total_price * 100,
    });

    return res.status(200).json({ message: `Refunded Succesfully` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Payment failed", message: error.message });
  }
});

export default paymentRouter;
