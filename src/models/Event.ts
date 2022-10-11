import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class Event extends Model {
  declare id?: number
  declare name: string
  declare description: string
  declare img: string
  declare startTime: Date
  declare duration: number
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
  startTime: {
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
  }
},
{
  sequelize
}
)

export default Event
