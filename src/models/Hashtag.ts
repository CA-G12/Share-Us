import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class Hashtag extends Model {
  declare id?: number
  declare title:  Array<string>
  declare color: string
}

Hashtag.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize
})

export default Hashtag
