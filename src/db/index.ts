import sequelize from './connection'
import {
  Event,
  User,
  JoinedPeople,
  InterestedPeople,
  Comments,
  Hashtag,
  HashtagEvent,
  Chat
} from '../models'

User.hasMany(Event)
Event.belongsTo(User)

User.belongsToMany(Event, { through: JoinedPeople })
Event.belongsToMany(User, { through: JoinedPeople })

User.belongsToMany(Event, { through: InterestedPeople })
Event.belongsToMany(User, { through: InterestedPeople })

User.hasMany(Comments)
Comments.belongsTo(User)

Hashtag.belongsToMany(Event, { through: HashtagEvent })
Event.belongsToMany(Hashtag, { through: HashtagEvent })

Chat.belongsTo(User, { as: 'receiver' })
Chat.belongsTo(User, { as: 'sender' })

export {
  sequelize,
  User,
  Event,
  JoinedPeople,
  InterestedPeople,
  Comments,
  Hashtag,
  HashtagEvent,
  Chat
}
