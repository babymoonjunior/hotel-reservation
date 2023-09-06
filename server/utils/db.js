import * as pg from "pg";
const { Pool } = pg.default;

const api = process.env.API_KEY;

const pool = new Pool({
  connectionString: `postgres://postgres:${api}@db.xjaplqknbkbdqgzwtjsp.supabase.co:6543/postgres`,
});

export { pool };
