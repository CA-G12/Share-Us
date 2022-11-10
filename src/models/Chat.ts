import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class Chat extends Model {
  declare id?: number
  declare message: string
}

Chat.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'unread',
    allowNull: false
  }
}, {
  sequelize
})
export default Chat
