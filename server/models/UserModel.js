import mongoose from "mongoose";

const UserModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    userType: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    houseNo: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    pincode: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserModel);
User.createIndexes();

export default User;
