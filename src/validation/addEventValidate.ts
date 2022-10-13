import Joi from 'joi'

const querySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
    .min(3)
    .required(),
  startTime: Joi.date()
    .greater('now')
    .required(),
  endTime: Joi.date()
    .greater('now')
    .required(),
  img: Joi.string().required(),
  status: Joi.any().valid('in-progress', 'closed', 'upcoming'),
  longitude: Joi.string().required(),
  latitude: Joi.string().required()
})

export default querySchema;