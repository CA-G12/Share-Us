import UserProfileController from '../../controllers/UserProfileController'
import express from 'express'
import expressWrapper from '../../helpers/expressWrapper'
const router = express.Router()

router.get('/users/:id', expressWrapper(UserProfileController.index))
router.put('/users/:id', expressWrapper(UserProfileController.update))
export default router
