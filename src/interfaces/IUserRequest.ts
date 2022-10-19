import { Request } from 'express'
import { IToken } from './IToken'

export interface IUserRequest extends Request {
  user?: IToken,
}
