import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class HashtagEvent extends Model {
  declare id?: number
}

HashtagEvent.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  sequelize
})

export default HashtagEvent
