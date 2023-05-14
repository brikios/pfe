import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
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
    "phone": {
        type: Number,
        required: true,
        unique:true
    },
    "img":{
        type :String,
        required : false
    },
    "isAdmin": {
        type: Boolean,
        default: false
    },
    },
    {   timestamps : true   }
)



export default mongoose.model("User",UserSchema)