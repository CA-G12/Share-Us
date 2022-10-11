import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, PORT, DB_URL, DATABASE_URL, TEST_DB, SECRET_KEY } = process.env

const config = {
  nodeEnv: NODE_ENV || 'development',
  port: PORT || 8080,
  db: DB_URL || '',
  db_production: DATABASE_URL || '',
  db_test: TEST_DB || '',
  secret_key: SECRET_KEY
}

export default config
