import mongoose from "mongoose";
import User from "./User.js";
import Property from "./Property.js";

const ReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    enum: ['draft', 'accepted', 'refused'],
    default:"draft",
  }
},{   timestamps : true   });



export default  mongoose.model("Report", ReportSchema);
