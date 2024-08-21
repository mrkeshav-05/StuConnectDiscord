import express from 'express';
import { sendDirectMessage, getDirectMessages, deleteDirectMessage } from '../controllers/directConversation.controller';
import { sendGroupMessage, getGroupMessages, deleteGroupMessage } from '../controllers/groupMessage.controller';

const router = express.Router();

// Direct message routes
router.post('/direct-message', sendDirectMessage);
router.get('/direct-message/:senderId/:receiverId', getDirectMessages);
router.delete('/direct-message/:id', deleteDirectMessage);

// Group message routes
router.post('/group-message', sendGroupMessage);
router.get('/group-message/:groupId', getGroupMessages);
router.delete('/group-message/:id', deleteGroupMessage);

export default router;
