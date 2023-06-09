import mongoose from "mongoose";
import User from "./User.js";

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
},{   timestamps : true   });

export default mongoose.model("Review",ReviewSchema)