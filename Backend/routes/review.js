import express from "express";
import { verifyToken, verifyTokenContract, verifyUser } from "../middlewares/verifyToken.js";
import  {addReview} from '../controllers/ReviewController.js'


const router = express.Router();


router.post("/addReview",verifyTokenContract,addReview)


export default router