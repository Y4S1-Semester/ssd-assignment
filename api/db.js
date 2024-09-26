import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host: '127.0.0.1',        
  port: 3306,               
  user: 'root',             
  password: 'Zima@0307',        
  database: 'blog'          
});
