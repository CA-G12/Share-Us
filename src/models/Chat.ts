import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'
import User from './User'

class Chat extends Model {
  declare id: number
  declare receiver_id: number
  declare sender_id: number
  declare message: string
}

Chat.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  receiver_id: {
    type: DataTypes.INTEGER
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'chat',
  sequelize
})
export default Chat
