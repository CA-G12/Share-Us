import { Request, Response } from 'express'
import validateParams from '../validation/paramsId'
import { User } from '../db'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'

export default class FollowingSystem {
  public static async allUsers (req:Request, res:Response) {
    const users = await User.findAll()
    res.json(users)
  }

  public static async follower (req:Request, res:Response) {
    const { userId, followerId } = req.params
    await Promise.all([validateParams({ id: userId }), validateParams({ id: followerId })])
    const myUsers = (await User.findOne({ where: { id: userId }, attributes: ['followers', 'blocked'] }))
    const myFollowers = myUsers?.followers
    const myBlocked = myUsers?.blocked

    const hisUsers = (await User.findOne({ where: { id: followerId }, attributes: ['following', 'blocked'] }))
    const hisFollowing = hisUsers?.following
    const hisBlocked = hisUsers?.blocked
    if (myFollowers?.includes(+followerId)) {
      // un follow
      const updated = await User.update(
        { followers: myFollowers?.filter((ele) => ele !== +followerId) },
        { where: { id: userId }, returning: true })
      await User.update(
        { following: hisFollowing?.filter((ele) => ele !== +userId) },
        { where: { id: followerId }, returning: true })

      res.json({ data: updated[1], message: 'un follow' })
    } else if (!(myBlocked?.includes(+followerId)) && !(hisBlocked?.includes(+userId))) {
      // follow
      myFollowers?.push(+followerId)
      const updated = await User.update(
        { followers: myFollowers },
        { where: { id: userId }, returning: true })

      hisFollowing?.push(+userId)
      await User.update(
        { following: hisFollowing },
        { where: { id: followerId }, returning: true })

      res.json({ data: updated[1], message: 'follow' })
    } else {
      throw new CustomError('User id blocked', 400)
    }
  }

  public static async following (req:Request, res:Response) {
    // un following
    const { userId, followingId } = req.params
    await Promise.all([validateParams({ id: userId }), validateParams({ id: followingId })])
    const following = (await User.findOne({ where: { id: userId }, attributes: ['following'] }))?.following
    const followers = (await User.findOne({ where: { id: followingId }, attributes: ['followers'] }))?.followers

    const updated = await User.update({ following: following?.filter(ele => ele !== +followingId) }, { where: { id: userId }, returning: true })
    await User.update({ followers: followers?.filter(ele => ele !== +userId) }, { where: { id: followingId } })
    res.json(updated[1])
  }

  public static async block (req:Request, res:Response) {
    const { userId, blockId } = req.params
    await Promise.all([validateParams({ id: userId }), validateParams({ id: blockId })])
    const blocked = (await User.findOne({ where: { id: userId }, attributes: ['blocked'] }))?.blocked
    if (blocked?.includes(+blockId)) {
      // un block
      const updated = await User.update(
        { blocked: blocked?.filter((ele) => ele !== +blockId) },
        { where: { id: userId }, returning: true })
      res.json({ data: updated[1], message: 'un blocked' })
    } else {
      // block
      const myUsers = (await User.findOne({ where: { id: userId }, attributes: ['followers', 'following'] }))
      const myFollowers = myUsers?.followers
      const myFollowing = myUsers?.following

      const hisUsers = (await User.findOne({ where: { id: blockId }, attributes: ['following', 'followers'] }))
      const hisFollowers = hisUsers?.followers
      const hisFollowing = hisUsers?.following

      blocked?.push(+blockId)
      const updated = await User.update(
        {
          blocked,
          followers: myFollowers?.filter(ele => ele !== +blockId),
          following: myFollowing?.filter(ele => ele !== +blockId)
        },
        { where: { id: userId }, returning: true })
      await User.update({
        following: hisFollowing?.filter(ele => ele !== +userId),
        followers: hisFollowers?.filter(ele => ele !== +userId)
      }, { where: { id: blockId } })
      res.json({ data: updated[1], message: 'blocked' })
    }
  }

  public static async allFollowers (req:Request, res:Response) {
    const { userId } = req.params
    await validateParams({ id: userId })
    const followers = (await User.findOne({ where: { id: userId }, attributes: ['followers'] }))?.followers
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
    const blockedData = await User.findAll({ where: { id: blocked }, attributes: { exclude: ['blocked'] } })
    res.json({
      data: blockedData,
      message: Message.SUCCESS
    })
  }
}
