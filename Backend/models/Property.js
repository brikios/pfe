import mongoose from "mongoose";


const PropertySchema = new mongoose.Schema({
    currentOwner:{
        type: mongoose.Types.ObjectId,
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
    }
});

export default mongoose.model("Property", PropertySchema)