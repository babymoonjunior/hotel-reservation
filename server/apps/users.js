import { pool } from "../utils/db.js";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM users")
    return res.json({
        data: result.rows
    })
});

usersRouter.post("/register", async (req, res) => {
    const newPost = {
        ...req.body
    }
    try {
        await pool.query(
            `INSERT INTO users(email, password, first_name, last_name, creditcard)    
            VALUES ($1, $2, $3, $4, $5)`, 
            [            
                newPost.email,
                newPost.password,
                newPost.first_name,
                newPost.last_name,
                newPost.creditcard
            ]
        )
        // await pool.query()
    }
    catch(error){
        return res.json({
            message: `There is Error database!!! ${newPost.first_name}`
        })
    }

    return res.json({
        message: `Post has been created successfully.`
    })
})

export default usersRouter;