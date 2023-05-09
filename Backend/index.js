import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import propertyRoute from "./routes/property.js";
import userRoute from "./routes/users.js"
import contractRoute from "./routes/contract.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
const app= express();



app.use(cors())
dotenv.config()

const connect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (error) {
    throw error
  } 
}
app.use(cookieParser())
app.use(express.json())

app.use("/auth", authRoute)
app.use("/property", propertyRoute)
app.use("/users", userRoute)
app.use("/contract",contractRoute)
mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("/",(req,res)=>{
    res.send("yalla go !!")
})
app.listen(8800,()=>{
    connect();
    console.log("connected to backend");
})