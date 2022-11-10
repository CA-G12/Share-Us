import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import isAuth from '../../middlewares/isAuth'
import ChatMessages from '../../controllers/Chat'
const router = express.Router()

router.get('/chat/messages/:receiverId', expressWrapper(isAuth), expressWrapper(ChatMessages.index))

router.get('/chat/messages/status/unread', expressWrapper(isAuth), expressWrapper(ChatMessages.countUnreadMessages))

router.put('/chat/messages/status', expressWrapper(isAuth), expressWrapper(ChatMessages.updateStatus))

router.delete('/chat/messages/:id', expressWrapper(isAuth), expressWrapper(ChatMessages.destroy))

export default router
