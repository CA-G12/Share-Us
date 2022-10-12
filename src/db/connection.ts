import { Sequelize } from 'sequelize'
import config from '../config/environment'
const sequelize = new Sequelize(config.connectionString, { dialectOptions: { ssl: config.ssl } })

export default sequelize
