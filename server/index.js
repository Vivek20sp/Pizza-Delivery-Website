import express from "express";
import connectDB from "./db.js";
import router from "./Routes/authroute.js";
import router1 from "./Routes/cartroute.js";
import bodyParser from "body-parser"; // Import body-parser
import cors from "cors";
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Add body parsing middleware for JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add body parsing middleware for URL-encoded bodies
dotenv.config();

connectDB();

app.use("/api/auth", router);

app.use("/api/cart", router1);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log(`Server running at port http://localhost:5000/`);
});
