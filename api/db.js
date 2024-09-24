import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host: '127.0.0.1',  // IP address as a string
  port: 3306,  // Port number
  user: 'root',
  password: 'password',
  database: 'blog'
});

