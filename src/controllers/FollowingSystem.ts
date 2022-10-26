import { Request, Response } from 'express'
import validateParams from '../validation/paramsId'
import { User } from '../db'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'
import { IUserRequest } from '../interfaces/IUserRequest'
import getFromUsers from '../queries/getFromUsers'
import deleteFromUsers from '../queries/deleteFromUsers'
import addToUsers from '../queries/addToUsers'
import blockUser from '../queries/blockUser'
import unBlock from '../queries/unBlockUser'

export default class FollowingSystem {
  public static async allUsers (req:Request, res:Response) {
    const users = await User.findAll()
    res.json(users)
  }

  public static async following (req:IUserRequest, res:Response) {
    const followerId = Number(req.params.followerId)
    const userId = Number(req.user?.id)
    if (userId === +followerId) throw new CustomError(Message.VALIDATION_ERROR, 422)
    await validateParams({ id: followerId })
    const { following: myFollowing, blocked: myBlocked } = await getFromUsers(userId, ['following', 'blocked'])

    const { followers: hisFollowers, blocked: hisBlocked } = await getFromUsers(followerId, ['followers', 'blocked'])

    if (!myFollowing || !myBlocked || !hisFollowers || !hisBlocked) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }

    if (myFollowing?.includes(followerId)) {
      // un Follow
      const authUser = await deleteFromUsers(userId, followerId, myFollowing, 'following')
      const updated = await deleteFromUsers(followerId, userId, hisFollowers, 'followers')
      res.json({ data: updated[1], authUser: authUser[1], message: 'un follow' })
    } else if (!(myBlocked?.includes(followerId)) && !(hisBlocked?.includes(userId))) {
      // follow

      const authUser = await addToUsers(userId, followerId, myFollowing, 'following')
      const updated = await addToUsers(followerId, userId, hisFollowers, 'followers')

      res.json({ data: updated[1], authUser: authUser[1], message: 'follow' })
    } else {
      throw new CustomError('User is blocked', 400)
    }
  }

  public static async removeFollowing (req:IUserRequest, res:Response) {
    // un following
    const { followingId } = req.params
    const userId = req.user?.id

    if (userId === followingId) throw new CustomError(Message.VALIDATION_ERROR, 422)
    await validateParams({ id: followingId })
    const followers = (await User.findOne({ where: { id: userId }, attributes: ['followers'] }))?.followers
    const following = (await User.findOne({ where: { id: followingId }, attributes: ['following'] }))?.following

    if (!following || !followers) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }
    const authUser = await User.update({ followers: followers?.filter(ele => ele !== +followingId) },
      { where: { id: userId }, returning: true })
    const updated = await User.update({ following: following?.filter(ele => ele !== Number(userId)) },
      { where: { id: followingId }, returning: true })
    res.json({ data: updated[1], authUser: authUser[1], message: 'un following' })
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

      const { updated, authUser } = await unBlock(userId, blockId, blocked)

      res.json({ data: updated, authUser: authUser[1], message: 'un blocked' })
    } else {
      // block
      const { updated, authUser } = await blockUser(userId, blockId, blocked)
      res.json({ data: updated[1][0], authUser: authUser[1], message: 'blocked' })
    }
  }

  public static async allFollowers (req:Request, res:Response) {
    const { userId } = req.params
    await validateParams({ id: userId })
    const followers = (await User.findOne({ where: { id: userId }, attributes: ['followers'] }))?.followers
    if (!followers) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }
    const followersData = await User.findAll({ where: { id: followers }, attributes: { exclude: ['password'] } })
    res.json({
      data: followersData,
      message: Message.SUCCESS
    })
  }

  public static async allFollowings (req:Request, res:Response) {
    const { userId } = req.params
    await validateParams({ id: userId })
    const following = (await User.findOne({ where: { id: userId }, attributes: ['following'] }))?.following
    if (!following) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }
    const followingsData = await User.findAll({ where: { id: following }, attributes: { exclude: ['password'] } })
    res.json({
      data: followingsData,
      message: Message.SUCCESS
    })
  }

  public static async allBlocked (req:Request, res:Response) {
    const { userId } = req.params
    await validateParams({ id: userId })
    const blocked = (await User.findOne({ where: { id: userId }, attributes: ['blocked'] }))?.blocked
    if (!blocked) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }
    const blockedData = await User.findAll({ where: { id: blocked }, attributes: { exclude: ['blocked'] } })
    res.json({
      data: blockedData,
      message: Message.SUCCESS
    })
  }
}
