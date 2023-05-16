import express  from "express";
import { getConversationByUserId, newConversation } from "../controllers/ConversationController.js";


const router = express.Router();

router.post('/newConversation',newConversation );

router.get('/getConvById/:userId',getConversationByUserId);

export default router