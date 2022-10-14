import { NextFunction, Request, Response } from 'express'
import CustomError from './CustomError'

const errorHandler = (controller: Function) => {
  return async (req:Request, res: Response, next:NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        err.status = 422
      }
      next(new CustomError(err.message || 'Internal server error', err.status || 500))
    }
  }
}
export default errorHandler
