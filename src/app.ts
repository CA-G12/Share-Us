import express, { Application } from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import router from './routes'
import environment from './config/environment'

class App {
  public app: Application
  public nodeEnv: string

  constructor () {
    this.app = express()
    this.nodeEnv = environment.nodeEnv
    this.initializeMiddlwares()
  }

  private initializeMiddlwares () {
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use('/api/v1', router)
  }
}

const { app } = new App()

export default app
