import { pool } from "../utils/db.js";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM users")
    return res.json({
        data: result.rows
    })
});

export default usersRouter;