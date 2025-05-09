import dotenv from "dotenv";
import mysql from "mysql2"



// Load environment variables from .env file
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});


