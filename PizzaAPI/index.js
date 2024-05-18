import { fileURLToPath } from "url";
import express from "express";
import ConnectToDb from "./db.js";
import bodyParser from "body-parser";
import router from "./routes/productRoute.js";
import { dirname } from "path";
import path from "path";
import cors from 'cors';
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;
dotenv.config();

ConnectToDb();

app.use(cors());


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/uploadImage", router);

app.listen(port, () => {
  console.log(`Server Running At Port http://localhost:4000/`);
});
