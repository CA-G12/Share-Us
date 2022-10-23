import { User } from '../db'
import { Request, Response } from 'express'
import validateParams from '../validation/paramsId'
import CustomError from '../helpers/CustomError'
import EditProfileSchema from '../validation/EditProfileUpdate'
import { Message } from '../config/messages'
import { IUserRequest } from '../interfaces/IUserRequest'

export default class UserProfileController {
  public static async index (req: Request, res:Response):Promise<void> {
    const { id } = req.params
    await validateParams({ id })

    const profile = await User.findOne({
      attributes: ['id', 'username', 'bio', 'location', 'profileImg',
        'headerImg', 'following', 'followers'],
      where: {
        id
      }
    })
    if (!profile) throw new CustomError('Not Found', 404)
    res.json({ data: profile, message: Message.SUCCESS })
  }

  public static async update (req: IUserRequest, res:Response):Promise<void> {
    const id = req.user?.id
    console.log(id)
    const { username, bio, location, profileImg, headerImg } = req.body?.data

    await validateParams({ id })
    await EditProfileSchema.validateAsync({ username, bio, location, profileImg, headerImg })

    const [updated, user] = await User.update({
      username,
      bio,
      location,
      profileImg: profileImg || 'https://st4.depositphotos.com/4329009/19956/v/600/\ndepositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg',
      headerImg: headerImg || 'https://cdn.discordapp.com/attachments/959502807071867000/1029123702052376686/Rectangle_2.png'
    }, {
      where: { id },

      returning: ['username', 'email', 'id', 'bio', 'location',
        'profileImg', 'headerImg', 'followers', 'following',
        'blocked', 'notifications', 'createdAt', 'updatedAt']
    })

    if (!updated) throw new CustomError('Not Found', 404)
    res.json({ data: user, message: 'Data updated successfully' })
  }
}
