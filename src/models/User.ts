import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class User extends Model {
  declare id?: number
  declare username: string
  declare email: string
  declare password: string
  declare bio: string
  declare location?: string
  declare profileImg?: string
  declare headerImg?: string
  declare followers: number[]
  declare following: number[]
  declare blocked: number[]
  declare notifications: any[]
  declare refreshToken?: string
  declare oauthAccessToken?: string
  declare oauthExpireIn?: number
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
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profileImg: {
      type: DataTypes.TEXT,
      defaultValue: `https://st4.depositphotos.com/4329009/19956/v/600/
depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg`
    },
    headerImg: {
      type: DataTypes.TEXT,
      defaultValue:
    'https://cdn.discordapp.com/attachments/959502807071867000/1029123702052376686/Rectangle_2.png'
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
      allowNull: false
    },
    following: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
      allowNull: false
    },
    blocked: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
      allowNull: false
    },
    notifications: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: []
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    oauthExpireIn: {
<<<<<<< HEAD
      type: DataTypes.INTEGER,
=======
      type: DataTypes.TEXT,
>>>>>>> 8d1043d3a51b52f88c43cccdea532c2271c792a8
      allowNull: true
    },
    oauthAccessToken: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize
  }
)

export default User
