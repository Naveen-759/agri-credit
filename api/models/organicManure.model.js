import mongoose, { Schema, model } from "mongoose";
import UserModel from "../models/user.model.js";

const organicManure = Schema(
  {
    manure_type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    manure_img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
    },
  },
  { timestamps: true }
);

export default model("Manure", organicManure);
