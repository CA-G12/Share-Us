import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class Comments extends Model {
  declare id?: number
  declare content: string
  declare image?: string
}

Comments.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize
})

export default Comments
