import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import FollowingSystem from '../../controllers/FollowingSystem'
import isAuth from '../../middlewares/isAuth'
const router = express.Router()

router.get('/users', expressWrapper(FollowingSystem.allUsers))

router.get('/users/:userId/followers', expressWrapper(FollowingSystem.allFollowers))
router.get('/users/:userId/following', expressWrapper(FollowingSystem.allFollowings))
router.get('/users/:userId/blocked', expressWrapper(FollowingSystem.allBlocked))

router.patch('/users/following/:followerId', expressWrapper(isAuth), expressWrapper(FollowingSystem.following))
router.delete('/users/following/:followingId', expressWrapper(isAuth), expressWrapper(FollowingSystem.removeFollowing))
router.patch('/users/blocked/:blockId', expressWrapper(isAuth), expressWrapper(FollowingSystem.block))

export default router
