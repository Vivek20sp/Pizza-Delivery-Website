import express from "express";
import findtoken from "../middleware/findtoken.js";
import Cart from "../models/CartModel.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/getAllItems", findtoken, async (req, res) => {
  try {
    const userId = await req.user;
    const items = await Cart.find({ user: userId });
    if (!items) {
      return res.status(401).json({ error: "No Items in the cart" });
    }
    res.status(200).send({ items });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: "Internal Server Error" });
  }
});

router.post(
  "/sendItemsIntoCart",
  [
    body("productDescription")
      .isLength(5)
      .notEmpty()
      .withMessage("Product description is required"),
    body("productPrice")
      .notEmpty()
      .isNumeric()
      .withMessage("Product price must be numeric"),
    body("productPhoto").notEmpty().withMessage("Image of product is required"),
    body("userLocation").notEmpty().withMessage("User location is required"),
    body("sellerLocation")
      .notEmpty()
      .withMessage("Seller Location is required"),
  ],
  findtoken,
  async (req, res) => {
    try {
      const user = await req.user;
      if (!user) {
        return res.status(401).send({ error: "User not found!" });
      }
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).send({ errors: error.array() });
      }
      const item = new Cart({
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productPhoto: req.body.productPhoto,
        userLocation: req.body.userLocation,
        sellerLocation: req.body.sellerLocation,
        user: user,
      });

      await item.save();

      res.status(200).send({ item });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ error: "Internal Server Error" });
    }
  }
);

router.delete("/removeItem/:id", findtoken, async (req, res) => {
  try {
    const userId = await req.user;

    if (!userId) {
      return res.status(400).send({ error: "User Not Found" });
    }

    const items = await Cart.findOneAndDelete({ id: req.query.id });

    res.status(200).send({ items });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: "Internal Server Error" });
  }
});

export default router;
