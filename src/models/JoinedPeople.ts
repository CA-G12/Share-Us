import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class JoinedPeople extends Model {
  declare id?: number
}

JoinedPeople.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  sequelize
})

export default JoinedPeople
