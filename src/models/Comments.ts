import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'
import Event from './Event'
import User from './User'

class Comments extends Model {
  declare id: number
  declare user_id: number
  declare event_id: number
  declare content: string
  declare image: string
  declare created_at: Date
}

Comments.init({
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
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'comments',
  sequelize
})

export default Comments
