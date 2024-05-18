import mongoose from "mongoose";

const CartModel = mongoose.Schema(
  {
    productDescription: {
      type: String,
      require: true,
    },
    productPrice: {
      type: Number,
      require: true,
    },
    productPhoto: {
      type: String,
      require: true,
    },
    userLocation: {
      type: String,
      require: true,
    },
    sellerLocation: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart',CartModel);

export default Cart;                                                                                                                        