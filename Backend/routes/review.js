import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import  {addReview} from '../controllers/ReviewController.js'


const router = express.Router();


router.post("/addReview",verifyToken,addReview)


export default router