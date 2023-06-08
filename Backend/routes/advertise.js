import express  from "express";
import { createAdvertise } from "../controllers/AdvertiseController.js";
const router = express.Router();

router.post('/createAd',createAdvertise)

export default router