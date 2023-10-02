import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import roomsRouter from "./apps/rooms.js";
import historyRouter from "./apps/history.js";
import paymentRouter from "./apps/payment.js";
import notificationRouter from "./apps/notification.js";
import cron from "node-cron";
import {
  dataFromCheckIn,
  insertNotificationCheckin,
  dataFromCheckOut,
  insertNotificationCheckOut,
} from "./cronjob/Task.js";
import bookRouter from "./apps/booking.js";
async function init() {
  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/rooms", roomsRouter);
  app.use("/history", historyRouter);
  app.use("/payment", paymentRouter);
  app.use("/booking", bookRouter);
  app.use("/notification", notificationRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not Found");
  });

  cron.schedule("0 14 * * *", async () => {
    try {
      const data = await dataFromCheckIn();
      await insertNotificationCheckin(data);
      console.log("Success Checkin Insert");
    } catch (error) {
      console.error("Cron job error:", error);
    }
  });

  cron.schedule("0 11 * * *", async () => {
    try {
      const data = await dataFromCheckOut();
      await insertNotificationCheckOut(data);
      console.log("Success Checkout Insert");
    } catch (error) {
      console.error("Cron job error:", error);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
}

init();
