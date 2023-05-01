import express from "express";
import { 
    updateUser,
    deleteUser,
    getUser,
    getUsers }
from "../controllers/UserController.js";
import { verifyUser,verifyAdmin,verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();


//CHECKER AUTH
router.get('/checkauth',verifyToken,(req,res,next)=>{
    res.send("you're logged in ")
})

//CHECKER AUTH USER
router.get('/checkauth/:id',verifyUser,(req,res,next)=>{
    res.send("you're logged in and u can update your account !")
})

//CHECKER AUTH ADMIN

router.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
    res.send("you're logged in as an admin !")
})

//UPDATE User
router.put("/update/:id",updateUser)

//DELETE User
router.delete("/delete/:id",verifyAdmin,deleteUser)

//GET User
router.get("/get/:id",getUser)

//GET ALL User
router.get("/getall",verifyAdmin,getUsers)

export default router