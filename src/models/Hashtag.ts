import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class Hashtag extends Model {
  declare id: number
  declare title: string
  declare color: string
}

Hashtag.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'hashtags',
  sequelize
})

export default Hashtag
