import { Request, Response } from 'express'
import validateParams from '../validation/paramsId'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'
import { IUserRequest } from '../interfaces/IUserRequest'
import { unBlockUser, blockUser, addToUsers, deleteFromUsers, getFromUsers, getAllUsers } from '../queries'

export default class FollowingSystem {
  public static async toggleFollowing (req:IUserRequest, res:Response) {
    const followingId = Number(req.params.followingId)
    const userId = Number(req.user?.id)
    if (userId === followingId) throw new CustomError(Message.VALIDATION_ERROR, 422)
    await validateParams({ id: followingId })
    const { following: myFollowing, blocked: myBlocked } = await getFromUsers(userId, ['following', 'blocked'])

    const { followers: hisFollowers, blocked: hisBlocked } = await getFromUsers(followingId, ['followers', 'blocked'])

    if (!myFollowing || !myBlocked || !hisFollowers || !hisBlocked) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }

    if (myFollowing?.includes(followingId)) {
      // un Follow
      const authUser = await deleteFromUsers(userId, followingId, myFollowing, 'following')
      const updated = await deleteFromUsers(followingId, userId, hisFollowers, 'followers')

      res.json({ data: updated[1], authUser: authUser[1], message: Message.UN_FOLLOW })
    } else if (!(myBlocked?.includes(followingId)) && !(hisBlocked?.includes(userId))) {
      // follow

      const authUser = await addToUsers(userId, followingId, myFollowing, 'following')
      const updated = await addToUsers(followingId, userId, hisFollowers, 'followers')

      res.json({ data: updated[1], authUser: authUser[1], message: Message.FOLLOW })
    } else {
      throw new CustomError('User is blocked', 400)
    }
  }

  public static async removeFollower (req:IUserRequest, res:Response) {
    // remove follower
    const followerId = Number(req.params.followerId)
    const userId = Number(req.user?.id)

    if (userId === followerId) throw new CustomError(Message.VALIDATION_ERROR, 422)
    await validateParams({ id: followerId })

    const { followers } = await getFromUsers(userId, ['followers'])
    const { following } = await getFromUsers(followerId, ['following'])

    if (!following || !followers) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }
    const authUser = await deleteFromUsers(userId, followerId, followers, 'followers')
    const updated = await deleteFromUsers(followerId, userId, following, 'following')

    res.json({ data: updated[1], authUser: authUser[1], message: Message.REMOVE_FOLLOWER })
  }

  public static async block (req:IUserRequest, res:Response) {
    const blockId = Number(req.params.blockId)
    const userId = Number(req.user?.id)

    if (userId === blockId) throw new CustomError(Message.VALIDATION_ERROR, 422)
    await validateParams({ id: blockId })
    const { blocked } = await getFromUsers(userId, ['blocked'])

    if (!blocked) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }

    if (blocked?.includes(blockId)) {
      // un block
      const { updated, authUser } = await unBlockUser(userId, blockId, blocked)
      res.json({ data: updated, authUser: authUser[1], message: Message.UNBLOCK_USER })
    } else {
      // block
      const { updated, authUser } = await blockUser(userId, blockId, blocked)
      res.json({ data: updated[1][0], authUser: authUser[1], message: Message.BLOCK_USER })
    }
  }

  public static async allFollowers (req:Request, res:Response) {
    const userId = Number(req.params.userId)
    await validateParams({ id: userId })
    const { followers } = await getFromUsers(userId, ['followers'])
    if (!followers) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }

    const followersData = await getAllUsers(followers, ['password'])

    res.json({
      data: followersData,
      message: Message.SUCCESS
    })
  }

  public static async allFollowings (req:Request, res:Response) {
    const userId = Number(req.params.userId)
    await validateParams({ id: userId })
    const { following } = await getFromUsers(userId, ['following'])
    if (!following) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }
    const followingsData = await getAllUsers(following, ['password'])
    res.json({
      data: followingsData,
      message: Message.SUCCESS
    })
  }

  public static async allBlocked (req:Request, res:Response) {
    const userId = Number(req.params.userId)
    await validateParams({ id: userId })

    const { blocked } = await getFromUsers(userId, ['blocked'])
    if (!blocked) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }
    const blockedData = await getAllUsers(blocked, ['password'])

    res.json({
      data: blockedData,
      message: Message.SUCCESS
    })
  }
}
