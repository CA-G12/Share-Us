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

User.hasMany(Event, { onDelete: 'cascade' })
Event.belongsTo(User)

User.hasMany(JoinedPeople)
JoinedPeople.belongsTo(User)

Event.hasMany(JoinedPeople, { onDelete: 'cascade' })
JoinedPeople.belongsTo(Event)

User.hasMany(InterestedPeople)
InterestedPeople.belongsTo(User)

Event.hasMany(InterestedPeople, { onDelete: 'cascade' })
InterestedPeople.belongsTo(Event)

User.hasMany(Comments)
Event.hasMany(Comments, { onDelete: 'cascade' })

Comments.belongsTo(Event)
Comments.belongsTo(User)

Hashtag.belongsToMany(Event, { through: HashtagEvent, onDelete: 'cascade' })
Event.belongsToMany(Hashtag, { as: 'Hashtags', through: HashtagEvent, onDelete: 'cascade' })

Chat.belongsTo(User, { as: 'receiver' })
Chat.belongsTo(User, { as: 'sender' })

User.hasMany(Chat, { as: 'received', foreignKey: 'receiverId' })
User.hasMany(Chat, { as: 'sent', foreignKey: 'senderId' })

Event.hasMany(Comments, { onDelete: 'cascade' })
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
