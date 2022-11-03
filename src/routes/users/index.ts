import UserProfileController from '../../controllers/UserProfileController'
import express from 'express'
import expressWrapper from '../../helpers/expressWrapper'
import isAuth from '../../middlewares/isAuth'
const router = express.Router()

router.get('/users/:id', expressWrapper(UserProfileController.index))
router.put('/users/:id', expressWrapper(isAuth), expressWrapper(UserProfileController.update))
router.patch('/users/:id/notifications', expressWrapper(isAuth), expressWrapper(UserProfileController.updateNotification))

export default router
