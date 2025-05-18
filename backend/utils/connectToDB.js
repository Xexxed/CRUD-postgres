import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
//console.log("password", process.env.PG_PASSWORD);
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_NAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export const query = async (text, params) => {
  const client = await pool.connect();
  //console.log("Connecting to DB");
  try {
    const result = await client.query(text, params);
    return result; // Ensure this returns an object with a 'rows' property
  } finally {
    client.release();
  }
};
