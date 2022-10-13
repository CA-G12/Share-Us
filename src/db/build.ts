import { sequelize, Event, User } from '.'
import fakeData from './FakeData/fakeData.json'

const { NODE_ENV } = process.env

const build = async () => {
  await sequelize.sync({ force: true })
  await Event.bulkCreate(fakeData.Events)
  await User.bulkCreate(fakeData.Users)
}

if (NODE_ENV !== 'test') {
  console.log('success')
  build()
}

export default build
