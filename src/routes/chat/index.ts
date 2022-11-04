import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import isAuth from '../../middlewares/isAuth'
import ChatMessages from '../../controllers/Chat'
const router = express.Router()

router.get('/chat/:receiverId', expressWrapper(isAuth), expressWrapper(ChatMessages.index))

export default router
