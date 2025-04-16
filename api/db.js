import dotenv from "dotenv";
import mysql from "mysql2"



// Load environment variables from .env file
dotenv.config();





export const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "blog"
});

