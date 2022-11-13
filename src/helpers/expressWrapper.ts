import { NextFunction, Request, Response } from 'express'
import CustomError from './CustomError'
import { Message } from '../config/messages'

const expressWrapper = (controller: Function) => {
  return async (req:Request, res: Response, next:NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (err: any) {
      console.log(err)
      if (err.name === 'ValidationError') {
        err.status = 422
        err.message = Message.VALIDATION_ERROR
      } else if (err.name === 'JsonWebTokenError') {
        err.status = 401
        err.message = 'unauthorized'
      }
      next(
        new CustomError(
          err.message || 'Internal server error', err.status || 500
        )
      )
    }
  }
}
export default expressWrapper
