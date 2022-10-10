import { Sequelize } from 'sequelize'
// import config from '../config/environment'

// let connectionString: string = ''

// if (!connectionString) throw new Error('Database url is not valid')

// if (config.nodeEnv === 'development') {
//   connectionString = config.db
// } else {
//   connectionString = 'test'
// }

const sequelize = new Sequelize('postgres://shareshams:123456@localhost:5432/shareus')

export default sequelize
