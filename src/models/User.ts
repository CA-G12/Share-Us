import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class User extends Model {
  declare id: number
  declare username: string
  declare email: string
  declare password: string
  declare bio: string
  declare location: string
  declare profile_img: string
  declare header_img: string
  declare followers: number[]
  declare following: number[]
  declare blocked: number[]
  declare notifications: string[]
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile_img: {
      type: DataTypes.TEXT,
      defaultValue: 'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
    },
    header_img: {
      type: DataTypes.TEXT,
      defaultValue: 'https://cdn.discordapp.com/attachments/959502807071867000/1029123702052376686/Rectangle_2.png'
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    following: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    blocked: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    notifications: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  },
  {
    tableName: 'users',
    sequelize
  }
)

export default User
