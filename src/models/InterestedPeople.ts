import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'
import User from './User'
import Event from './Event'

class InterestedPeople extends Model {
  declare id: number
  declare user_id: number
  declare event_id: number
}

InterestedPeople.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  event_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id'
    }
  }
}, {
  tableName: 'interested_people',
  sequelize
})

export default InterestedPeople
