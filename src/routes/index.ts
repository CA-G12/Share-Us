import CustomError from '../helpers/CustomError'
import expressWrapper from '../helpers/expressWrapper'
import express, { Request, Response } from 'express'
import events from './events'
import comments from './comments'
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
Router.get('/hello', expressWrapper(controller))

Router.use(events)
Router.use(comments)

export default Router
