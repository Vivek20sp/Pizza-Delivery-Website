import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  ProductPhotos: [
    {
      type: String,
      data: String,
      required: true,
    },
  ],
  ProductName: {
    type: String,
    required: true,
  },
  ProductDescription: {
    type: String,
    required: true,
  },
  ShortProductDescription: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  ShopName: {
    type: String,
    required: true,
  },
  Pincode: {
    type: String,
    require: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
