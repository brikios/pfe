import express  from "express";
import { addPayment, verifyPayment } from "../controllers/PaymentController.js";

const router = express.Router();

router.post('/addPayment',addPayment)
router.post('/verifyPayment/:id',verifyPayment)

export default router