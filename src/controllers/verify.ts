import { Response } from 'express'
import { IUserRequest } from '../interfaces/IUserRequest'
import { User } from '../db'

const verify = async (req:IUserRequest, res:Response) => {
  const user = req.user
  const userData = await User.findOne({ where: { id: user?.id } })
  if (userData?.password) {
    userData.password = ''
  }
  res.json({ data: userData })
}
export default verify
