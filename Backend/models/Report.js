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
  },
  userReported: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reportType: {
    type: String,
    enum:["user","property"],
    required: true,
  },
  status:{
    type: String,
    enum: ['draft', 'accepted', 'refused'],
    default:"draft",
  }
},{   timestamps : true   });



export default  mongoose.model("Report", ReportSchema);
