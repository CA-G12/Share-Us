import { User } from '../db'

import * as bcrypt from 'bcrypt'
import generateToken from '../helpers/generateToken'
import { Request, Response } from 'express'
import validateSignup from '../validation/signup'

const signup = async (req:Request, res: Response) => {
  try {
    await validateSignup(req.body)
    const userExist = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (userExist) {
      return res.status(400).json('username already exists')
    }

    const emailExist = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (emailExist) {
      return res.status(400).json('email already exists')
    }

    const hashed = await bcrypt.hash(req.body.password, 10)

    const userData = await User.create({ ...req.body, password: hashed })

    const token = await generateToken({ id: userData.id, username: userData.username })
    userData.password = ''
    res.json({ data: userData, token })
  } catch (err) {
    res.status(400).json(err)
  }
}
export default signup
