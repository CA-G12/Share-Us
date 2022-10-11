import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'

class InterestedPeople extends Model {
  declare id?: number
}

InterestedPeople.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  sequelize
})

export default InterestedPeople
