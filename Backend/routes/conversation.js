import express  from "express";
import { getConversationByUserId, newConv, newConversation } from "../controllers/ConversationController.js";

import { verifyToken, verifyTokenContract, verifyUser } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/newConversation',newConversation);

router.get('/getConvById/:userId',getConversationByUserId);
router.post('/newC/:id',verifyToken,newConv);
export default router