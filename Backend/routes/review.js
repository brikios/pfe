import express from "express";
import { verifyToken, verifyTokenContract, verifyUser } from "../middlewares/verifyToken.js";
import  {addReview, getReviewsById} from '../controllers/ReviewController.js'


const router = express.Router();


router.post("/addReview",verifyTokenContract,addReview)
router.get('/get/:id',getReviewsById)

export default router