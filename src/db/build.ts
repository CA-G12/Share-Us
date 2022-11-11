import { sequelize, Event, User } from '.'
import fakeData from './FakeData/fakeData.json'
import config from '../config/environment'
export const build = async () => {
  if (config.nodeEnv !== 'production') {
    await sequelize.sync({ force: true })
    await User.bulkCreate(fakeData.Users)
    await Event.bulkCreate(fakeData.Events)
  } else {
    await sequelize.sync({ force: false })
  }
}

if (config.nodeEnv !== 'test') {
  build().then(() => console.log('database built successfully')).catch((err) => console.log(err))
}

export default build
