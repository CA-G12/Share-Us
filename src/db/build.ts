import { sequelize, Event, User } from '.'
import fakeData from './FakeData/fakeData.json'
const build = async () => {
  await sequelize.sync({ force: true })
  await Event.bulkCreate(fakeData.Events)
  await User.bulkCreate(fakeData.Users)
}

build()
