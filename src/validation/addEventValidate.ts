import Joi from 'joi'
const imagePattern: RegExp = /\.(jpe?g|png|gif|bmp)$/i
const querySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
    .required(),
  startTime: Joi.date()
    .required(),
  endTime: Joi.date().min(Joi.ref('startTime'))
    .required(),
  img: Joi.string()
    .pattern(imagePattern)
    .required(),
  longitude: Joi.number()
    .required(),
  latitude: Joi.number()
    .required(),
  placeName: Joi.string()
    .required(),
  hashtag: Joi.array().items(Joi.string())
})

export default querySchema
