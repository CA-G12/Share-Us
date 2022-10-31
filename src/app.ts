import express, { Application, NextFunction, Request, Response } from 'express'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes'
import config from './config/environment'
import reminderEmail from './cornJobs/ReminderEmail'

class App {
  public app: Application
  public nodeEnv: string

  constructor () {
    this.app = express()
    this.nodeEnv = config.nodeEnv
    this.initializeMiddlwares()
    this.initializeCronJobs()
  }

  private initializeMiddlwares () {
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())
    this.app.use('/api/v1', router)
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status).json({ message: err.message })
    })
  }

  private initializeCronJobs () {
    reminderEmail()
  }
}

const { app } = new App()

export default app
