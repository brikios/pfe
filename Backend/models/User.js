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
        required : false,
        default:"https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1684606415~exp=1684607015~hmac=ef0300ee552a1a766244d0bc7525fc30925290bb349e6c26a3a0123a0b922213"
    },
    "isAdmin": {
        type: Boolean,
        default: false
    },
    },
    {   timestamps : true   }
)



export default mongoose.model("User",UserSchema)