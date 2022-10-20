import { Response, NextFunction } from 'express'
import CustomError from '../helpers/CustomError'
import verifyToken from '../helpers/verifyToken'
import { IToken } from '../interfaces/IToken'
import { IUserRequest } from '../interfaces/IUserRequest'

const checkUser = async (req:IUserRequest, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    throw new CustomError('unauthorized', 401)
  }
  const verified:IToken = await verifyToken(token)
  req.user = verified
  next()
}
export default checkUser
