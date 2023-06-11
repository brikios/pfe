import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
    
    "userName": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique : true
    },
    "password": {
        type: String,
        required: true
    },
    
    "revenue": {
        type: Number,
        default: 0
    },
    },
    {   timestamps : true   }
)



export default mongoose.model("Admin",AdminSchema)