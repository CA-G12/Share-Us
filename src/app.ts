import express, { Application } from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import router from './routes'
import config from './config/environment'
import { sequelize } from './db'
import passport from 'passport'

class App {
  public app: Application
  public nodeEnv: string

  constructor () {
    this.app = express()
    this.nodeEnv = config.nodeEnv
    this.initializeMiddlwares()
  }

  private initializeMiddlwares () {
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(passport.initialize())
    this.app.use('/api/v1/', router)
  }
}

const testing = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
testing()
const { app } = new App()

export default app
