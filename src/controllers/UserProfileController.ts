/* eslint-disable no-unused-expressions */
import { User } from '../db'
import { Request, Response } from 'express'
import validateParams from '../validation/paramsId'
import CustomError from '../helpers/CustomError'
import EditProfileSchema from '../validation/EditProfileUpdate'
import { Message } from '../config/messages'
import { IUserRequest } from '../interfaces/IUserRequest'
import { read } from 'fs'
import e from 'cors'

export default class UserProfileController {
  public static async index (req: Request, res:Response):Promise<void> {
    const { id } = req.params
    await validateParams({ id })

    const profile = await User.findOne({
      attributes: ['id', 'username', 'bio', 'location', 'profileImg',
        'headerImg', 'following', 'followers', 'notifications'],
      where: {
        id
      }
    })
    if (!profile) throw new CustomError('Not Found', 404)
    res.json({ data: profile, message: Message.SUCCESS })
  }

  public static async update (req: IUserRequest, res:Response):Promise<void> {
    const id = req.user?.id
    const { username, bio, location, profileImg, headerImg } = req.body?.data

    await validateParams({ id })
    await EditProfileSchema.validateAsync({ username, bio, location, profileImg, headerImg })

    const [updated, user] = await User.update({
      username,
      bio,
      location,
      profileImg,
      headerImg
    }, {
      where: { id },

      returning: ['username', 'email', 'id', 'bio', 'location',
        'profileImg', 'headerImg', 'followers', 'following',
        'blocked', 'notifications', 'createdAt', 'updatedAt']
    })

    if (!updated) throw new CustomError('Not Found', 404)
    res.json({ data: user, message: 'Data updated successfully' })
  }

  public static async updateNotification (req: IUserRequest, res:Response):Promise<void> {
    const id = req.user?.id
    const notificationId = req.body.id
    await validateParams({ id })

    console.log(notificationId)
    const user:any = await User.findOne({ where: { id } })
    const noti = user.notifications.map((element:any, i:number) => {
      if (element.id === +notificationId) {
        console.log(element.status)
        return { ...element, status: 'read' }
      }
      return element
    })
    console.log(noti)
    const updateNotifications =
    await user.update({
      notifications: noti
    })
    res.json({ massage: 'updated successfully', status: 'read' })
  }
}
