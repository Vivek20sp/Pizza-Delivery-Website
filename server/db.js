import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.CONNECTION_STRING;

const  connectDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to the database');
    } catch (error) {
        console.log('Failed to connect to database');
    }
}

export default connectDB;