import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, PORT, DB_URL, DATABASE_URL, TEST_DB, SECRET_KEY, TOKEN1, TOKEN2, SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env

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

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not provided in env vars')
}
if (!SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not provided in env vars')
}
if (!SENDGRID_EMAIL) {
  throw new Error('SENDGRID_EMAIL is not provided in env vars')
}

const config = {
  nodeEnv: NODE_ENV,
  port: PORT || 8080,
  connectionString,
  ssl,
  secretKey: SECRET_KEY,
  token: TOKEN1,
  token2: TOKEN2,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL

}

export default config
