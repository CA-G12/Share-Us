import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, PORT, DB_URL } = process.env

const config = {
  nodeEnv: NODE_ENV || 'development',
  port: PORT || 8080,
  db: DB_URL || ''
}

export default config
