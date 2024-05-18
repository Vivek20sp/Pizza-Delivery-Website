import express from "express";
import User from "../models/UserModel.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import findtoken from "../middleware/findtoken.js";

const router = express.Router();

router.post(
  "/signin",
  [
    body("name").isLength(5).withMessage("Enter name have more the 5 char"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength(5).withMessage("Enter password more than 5 char"),
    body("userType").notEmpty().withMessage("Select user type"),
    body("phone")
      .isNumeric()
      .isLength(10)
      .withMessage("Enter the number with 10 digits"),
    body("houseNo").notEmpty().withMessage("House no is required"),
    body("address")
      .notEmpty()
      .isLength(5)
      .withMessage("Address should be at least 5 characters"),
    body("city")
      .notEmpty()
      .isString()
      .isLength(3)
      .withMessage("city name is required"),
    body("state").notEmpty().isLength(3).withMessage("State code is required"),
    body("pincode")
      .isNumeric()
      .isLength(6)
      .withMessage("Enter pincode in numbers only"),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res
          .status(400)
          .send({ error: error.array(), message: "Validation failed" });
      }
      let user = await User.findOne({ email: req.body.email });
      // check for existing user
      if (user) {
        return res.status(400).send({ error: "Internal Server Error" });
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        userType: req.body.userType,
        phone: req.body.phone,
        houseNo: req.body.houseNo,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
      });

      const data = {
        user: {
          userId: user.id,
        },
      };

      const secrete = "VivekIsCollegeStudent";

      const token = jwt.sign(data, secrete);

      res.send({ token });

    } catch (error) {
      console.log(error.message);
      res.status(401).send({ error: error.message });
    }
  }
);

router.post(
  "/login",
  [
    body("name")
      .isLength(5)
      .notEmpty()
      .withMessage("Name must be at least 5 characters long"),
    body("email").isEmail().withMessage("Invalid Email ID"),
    body("password")
      .isLength(5)
      .notEmpty()
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).send({ error: "User not found" });
      }

      const ComparePassword = bcrypt.compare(req.body.password, user.password);

      if (!ComparePassword) {
        return res.status(400).send({ error: "Authonication Denied" });
      }

      let data = {
        user: {
          userId: user.id,
        },
      };

      const secreteKey = "VivekIsCollegeStudent";

      const token = jwt.sign(data, secreteKey);

      res.send({ token });

    } catch (error) {
      console.log(error.message);
      res.status(401).send({ error: error.message });
    }
  }
);

router.get("/getUserInfo", findtoken, async (req, res) => {
  try {
    const userId = await req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ error: "No User Found with this UserID!" });
    }
    res.status(200).send({ user });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

export default router;
