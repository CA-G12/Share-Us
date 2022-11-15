import Joi from 'joi'
const querySchema = Joi.object({
  summary: Joi.string().required(),
  description: Joi.string()
    .min(3)
    .required(),
  startTime: Joi.date().greater(Date.now())
    .required(),
  endTime: Joi.date().min(Joi.ref('startTime'))
    .required()
})

export default querySchema
