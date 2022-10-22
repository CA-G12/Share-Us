import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import FollowingSystem from '../../controllers/FollowingSystem'
import checkUser from '../../middlewares/checkUser'
const router = express.Router()

router.get('/users', expressWrapper(FollowingSystem.allUsers))

router.get('/users/:userId/followers', expressWrapper(FollowingSystem.allFollowers))
router.get('/users/:userId/following', expressWrapper(FollowingSystem.allFollowings))
router.get('/users/:userId/blocked', expressWrapper(FollowingSystem.allBlocked))

router.use(expressWrapper(checkUser))
router.patch('/users/:userId/followers/:followerId', expressWrapper(FollowingSystem.follower))
router.patch('/users/:userId/following/:followingId', expressWrapper(FollowingSystem.following))
router.patch('/users/:userId/blocked/:blockId', expressWrapper(FollowingSystem.block))

export default router
