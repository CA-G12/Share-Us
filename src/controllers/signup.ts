import { User } from '../db'

import * as bcrypt from 'bcrypt'
import generateToken from '../helpers/generateToken'
import { Request, Response } from 'express'
import validateSignup from '../validation/signup'
import CustomError from '../helpers/CustomError'

const signup = async (req:Request, res: Response) => {
  await validateSignup(req.body)
  const userExist = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  if (userExist) {
    throw new CustomError('username already exists', 400)
  }

  const emailExist = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if (emailExist) {
    throw new CustomError('email already exists', 400)
  }

  const hashed = await bcrypt.hash(req.body.password, 10)

  const userData = await User.create({ ...req.body, password: hashed })

  const token = await generateToken({ id: userData.id, username: userData.username })
  userData.password = ''
  res.json({ data: userData, token })
}
export default signup
