import Joi from 'joi'

const filterQuerySchema = Joi.object({
  from: Joi.string().isoDate(),
  to: Joi.string().isoDate(),
  status: Joi.any().valid('in-progress', 'closed', 'upcoming')
})

export default filterQuerySchema
