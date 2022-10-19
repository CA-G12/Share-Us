import joi from 'joi'

const validateParams = (data: object) => {
  const schema = joi.object({
    id: joi.number().min(1).required()
  })
  return schema.validateAsync(data)
}
export default validateParams
