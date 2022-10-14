import CustomError from '../error/CustomError'
import errorHandler from '../error/errorHandler'
import express, { Request, Response } from 'express'
import * as joi from 'joi'
const Router = express.Router()

const controller = async (request: Request, response: Response) => {
  const schema = joi.object({
    user: joi.string().required(),
    password: joi.string().min(3).max(8).required()
  })
  await schema.validateAsync(request.body)
  if (request.body.user !== 'saif') {
    throw new CustomError('Your are not saif', 400)
  }
  response.json({ message: 'Hiiii' })
}
Router.get('/hello', errorHandler(controller))

export default Router
