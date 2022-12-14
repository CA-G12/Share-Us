import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class Event extends Model {
  declare id?: number
  declare name: string
  declare description: string
  declare img: string
  declare status: 'in-progress' | 'closed' | 'upcoming'
  declare startTime: Date
  declare endTime: Date
  declare longitude: string
  declare latitude: string
  declare placeName: string
  setHashtags: any
}

Event.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
  status: {
    type: DataTypes.ENUM('in-progress', 'closed', 'upcoming'),
    defaultValue: 'upcoming',
    allowNull: false
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false
  },
  placeName: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize
}
)

export default Event
