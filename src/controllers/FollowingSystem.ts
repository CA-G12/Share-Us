import { Request, Response } from 'express'
import validateParams from '../validation/paramsId'
import { User } from '../db'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'
import { IUserRequest } from '../interfaces/IUserRequest'

export default class FollowingSystem {
  public static async allUsers (req:Request, res:Response) {
    const users = await User.findAll()
    res.json(users)
  }

  public static async following (req:IUserRequest, res:Response) {
    const { followerId } = req.params
    const userId = req.user?.id
    if (userId === followerId) throw new CustomError(Message.VALIDATION_ERROR, 422)
    await validateParams({ id: followerId })
    const myUsers = (await User.findOne({ where: { id: userId }, attributes: ['following', 'blocked'] }))
    const myFollowing = myUsers?.following
    const myBlocked = myUsers?.blocked

    const hisUsers = (await User.findOne({ where: { id: followerId }, attributes: ['followers', 'blocked'] }))
    const hisFollowers = hisUsers?.followers
    const hisBlocked = hisUsers?.blocked
    if (!myFollowing || !myBlocked || !hisFollowers || !hisBlocked) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }

    if (myFollowing?.includes(+followerId)) {
      // un follow
      const authUser = await User.update(
        { following: myFollowing?.filter((ele) => ele !== +followerId) },
        { where: { id: userId }, returning: true })
      const updated = await User.update(
        { followers: hisFollowers?.filter((ele) => ele !== Number(userId)) },
        { where: { id: followerId }, returning: true })

      res.json({ data: updated[1], authUser: authUser[1], message: 'un follow' })
    } else if (!(myBlocked?.includes(+followerId)) && !(hisBlocked?.includes(Number(userId)))) {
      // follow
      myFollowing?.push(+followerId)
      const authUser = await User.update(
        { following: myFollowing },
        { where: { id: userId }, returning: true })

      hisFollowers?.push(Number(userId))
      const updated = await User.update(
        { followers: hisFollowers },
        { where: { id: followerId }, returning: true })

      res.json({ data: updated[1], authUser: authUser[1], message: 'follow' })
    } else {
      throw new CustomError('User id blocked', 400)
    }
  }

  public static async removeFollowing (req:IUserRequest, res:Response) {
    // un following
    const { followingId } = req.params
    const userId = req.user?.id

    if (userId === followingId) throw new CustomError(Message.VALIDATION_ERROR, 422)
    await validateParams({ id: followingId })
    const following = (await User.findOne({ where: { id: userId }, attributes: ['following'] }))?.following
    const followers = (await User.findOne({ where: { id: followingId }, attributes: ['followers'] }))?.followers

    if (!following || !followers) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }
    const updated = await User.update({ following: following?.filter(ele => ele !== +followingId) }, { where: { id: userId }, returning: true })
    await User.update({ followers: followers?.filter(ele => ele !== Number(userId)) }, { where: { id: followingId } })
    res.json({ data: updated[1], message: 'un following' })
  }

  public static async block (req:IUserRequest, res:Response) {
    const { blockId } = req.params
    const userId = req.user?.id

    if (userId === blockId) throw new CustomError(Message.VALIDATION_ERROR, 422)
    await validateParams({ id: blockId })
    const blocked = (await User.findOne({ where: { id: userId }, attributes: ['blocked'] }))?.blocked
    if (!blocked) {
      throw new CustomError(Message.VALIDATION_ERROR, 422)
    }

    if (blocked?.includes(+blockId)) {
      // un block
      const authUser = await User.update(
        { blocked: blocked?.filter((ele) => ele !== +blockId) },
        { where: { id: userId }, returning: true })
      const updated = await User.findOne({ where: { id: blockId } })
      res.json({ data: updated, authUser: authUser[1], message: 'un blocked' })
    } else {
      // block
      const myUsers = (await User.findOne({ where: { id: userId }, attributes: ['followers', 'following'] }))
      const myFollowers = myUsers?.followers
      const myFollowing = myUsers?.following

      const hisUsers = (await User.findOne({ where: { id: blockId }, attributes: ['following', 'followers'] }))
      const hisFollowers = hisUsers?.followers
      const hisFollowing = hisUsers?.following

      if (!myFollowers || !myFollowing || !hisFollowing || !hisFollowers) {
        throw new CustomError(Message.VALIDATION_ERROR, 422)
      }

      blocked?.push(+blockId)
      const authUser = await User.update(
        {
          blocked,
          followers: myFollowers?.filter(ele => ele !== +blockId),
          following: myFollowing?.filter(ele => ele !== +blockId)
        },
        { where: { id: userId }, returning: true })
      const updated = await User.update({
        following: hisFollowing?.filter(ele => ele !== Number(userId)),
        followers: hisFollowers?.filter(ele => ele !== Number(userId))
      }, { where: { id: blockId }, returning: true })
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
