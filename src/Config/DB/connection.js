import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

//get database connection string from env
const connectionString = process.env.DATABASE;

//connect to the database
const db = mongoose.connect(connectionString).then(() => {
    console.log('MongoDB connection established');
})
.catch((error) => {
    console.log('MongoDB connection error',error);
    
})

export default db;