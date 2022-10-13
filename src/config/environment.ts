import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, PORT, DB_URL, DATABASE_URL, TEST_DB, SECRET_KEY } = process.env

let connectionString: string | undefined = ''
let ssl: boolean | object = false

if (NODE_ENV === 'development') {
  connectionString = DB_URL
} else if (NODE_ENV === 'production') {
  connectionString = DATABASE_URL
  ssl = {
    rejectUnauthorized: false
  }
} else if (NODE_ENV === 'test') {
  connectionString = TEST_DB
} else {
  throw new Error('Invalid Node Env')
}

if (!connectionString) {
  throw new Error('Database url is not valid')
}

const config = {
  nodeEnv: NODE_ENV,
  port: PORT || 8081,
  connectionString,
  ssl,
  secretKey: SECRET_KEY
}

export default config
