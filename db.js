import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.ROOT_DB_PASSWORD,
    database: 'ips_data_base_users'
});

connection.connect((err) =>{
    if(err){
        console.error("Error during connection", err)
        return;
    }
    console.log("connected")
})

export default connection;