import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const ConnectionString = process.env.CONNECTION_STRING;

const ConnectToDb = async () => {
  try {
    await mongoose.connect(ConnectionString);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Failed to connect");
  }
};

export default ConnectToDb;
