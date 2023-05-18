import express  from "express";
import { addMessage, getMessage } from "../controllers/MessageController.js";

const router = express.Router();

router.post('/addMsg',addMessage)
router.get('/getMsg/:id',getMessage)
export default router