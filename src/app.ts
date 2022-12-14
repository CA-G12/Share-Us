import express, { Application, NextFunction, Request, Response } from 'express'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes'
import config from './config/environment'
import Websocket from './webSocket/serverSocket'
import NotificationSocket from './webSocket/notification.socket'
import { createServer } from 'http'
import reminderEmail from './cronJobs/ReminderEmail'
import changeStatus from './cronJobs/changeStatus'
import { ScheduledTask } from 'node-cron'
import ChatSocket from './webSocket/chat.socket'
import { join } from 'path'

class App {
  public app: Application
  public nodeEnv: string
  public cronJobs: Array<ScheduledTask>

  constructor () {
    this.app = express()
    this.cronJobs = []
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
    if (config.nodeEnv === 'production') {
      this.app.use(express.static(join(__dirname, '..', 'client', 'build')))

      this.app.get('*', (req, res) => {
        res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'))
      })
    }

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ message: 'Not Found' })
    })

    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status).json({ message: err.message })
    })
  }

  private initializeCronJobs () {
    this.cronJobs = [
      reminderEmail(),
      changeStatus()
    ]
  }
}

const { app, cronJobs } = new App()

export { cronJobs }

const httpServer = createServer(app)
const io = Websocket.getInstance(httpServer)

io.initializeHandlers([
  { path: '/notifications', handler: new NotificationSocket() },
  { path: '/chat', handler: new ChatSocket() }
])

export default httpServer
