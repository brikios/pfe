import express  from "express";
import { createAdvertise, getAdvertise } from "../controllers/AdvertiseController.js";
const router = express.Router();

router.post('/createAd',createAdvertise)
router.get('/getall',getAdvertise)
export default router