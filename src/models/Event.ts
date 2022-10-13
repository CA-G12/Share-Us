import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class Event extends Model {
  declare id?: number
  declare name: string
  declare description: string
  declare img: string
  declare status: 'in-progress' | 'closed' | 'upcoming'
  declare from: Date
  declare to: Date
  declare date: Date
  declare longitude: string
  declare latitude: string
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
  from: {
    type: DataTypes.DATE,
    allowNull: false
  },
  to: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize
}
)

export default Event
