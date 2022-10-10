import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'
import User from './User'

class Event extends Model {
  declare id: number
  declare user_id: number
  declare name: string
  declare description: string
  declare img: string
  declare start_time: Date
  declare duration: number
  declare longitude: string
  declare latitude: string
  declare created_at: Date
}

Event.init({
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  start_time: {
    type: 'TIMESTAMP',
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  longitude: {
    type: DataTypes.STRING
  },
  latitude: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE
  }
},
{
  tableName: 'events',
  sequelize
}
)

export default Event
