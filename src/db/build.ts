import { sequelize, Event, User } from '.'
import fakeData from './FakeData/fakeData.json'
import config from '../config/environment'

const build = async () => {
  await sequelize.sync({ force: true })
  await Event.bulkCreate(fakeData.Events)
  await User.bulkCreate(fakeData.Users)
}

if (config.nodeEnv !== 'test') {
  build().then(() => console.log('database built successfully'))
}

export default build
