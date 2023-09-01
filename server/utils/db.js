import * as pg from "pg";
const { Pool } = pg.default;

const api = process.env.API_KEY;

const pool = new Pool({
    connectionString: `postgresql://postgres:${api}@db.xjaplqknbkbdqgzwtjsp.supabase.co:5432/postgres`,
});

export { pool };