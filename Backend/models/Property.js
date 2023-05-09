import mongoose from "mongoose";
import User from "./User.js";

const PropertySchema = new mongoose.Schema({
    currentOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required :true
    },
    type:{
        type: String,
        required: true 
    },
    city:{
        type: String,
        required: true 
    },
    adress:{
        type: String,
        required: true 
    },
    images:{
        type: [String],
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true 
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    price:{
        type: Number,
        required:true
    },
    featured:{
        type: Boolean,
        default: false
    },
},{   timestamps : true   });

export default mongoose.model("Property", PropertySchema)