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

User.hasMany(JoinedPeople)
JoinedPeople.belongsTo(User)

Event.hasMany(JoinedPeople)
JoinedPeople.belongsTo(Event)

User.hasMany(InterestedPeople)
InterestedPeople.belongsTo(User)

Event.hasMany(InterestedPeople)
InterestedPeople.belongsTo(Event)

User.hasMany(Comments)
Comments.belongsTo(User)

Hashtag.belongsToMany(Event, { through: HashtagEvent })
Event.belongsToMany(Hashtag, { through: HashtagEvent })

Chat.belongsTo(User, { as: 'receiver' })
Chat.belongsTo(User, { as: 'sender' })

Event.hasMany(Comments)
Comments.belongsTo(Event)

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
