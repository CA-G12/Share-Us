import { Sequelize } from 'sequelize'
import config from '../config/environment'

const sequelize = new Sequelize(
  config.connectionString,
  {
    logging: false,
    ...(config.nodeEnv === 'production'
      ? {
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
          }
        }
      : {
          dialectOptions: {
            ssl: false
          }
        })
  }
)

export default sequelize
