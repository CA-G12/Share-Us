import sequelize from '../db/connection'
import { Model, DataTypes } from 'sequelize'
import Event from './Event'
import Hashtag from './Hashtag'

class HashtagEvent extends Model {
  declare id: number
  declare hashtag_id: number
  declare event_id: number
}

HashtagEvent.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  hashtag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Hashtag,
      key: 'id'
    }
  },
  event_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id'
    }
  }
}, {
  tableName: 'hashtag_event',
  sequelize
})

export default HashtagEvent
