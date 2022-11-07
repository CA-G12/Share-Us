import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import isAuth from '../../middlewares/isAuth'
import ChatMessages from '../../controllers/Chat'
const router = express.Router()

router.get('/chat/messages/:receiverId', expressWrapper(isAuth), expressWrapper(ChatMessages.index))

router.delete('/chat/messages/:id', expressWrapper(isAuth), expressWrapper(ChatMessages.destroy))

export default router
