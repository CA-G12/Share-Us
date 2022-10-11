import { Sequelize } from 'sequelize'
import config from '../config/environment'

let connectionString: string = ''
let ssl: boolean | object = false

if (config.nodeEnv === 'development') {
  connectionString = config.db
} else if (config.nodeEnv === 'production') {
  connectionString = config.db_production
  ssl = {
    rejectUnauthorized: false
  }
} else if (config.nodeEnv === 'test') {
  connectionString = config.db_test
} else {
  throw new Error('Database url is not valid')
}

const sequelize = new Sequelize(connectionString, { dialectOptions: { ssl } })

export default sequelize
