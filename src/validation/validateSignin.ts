import Joi from 'joi'

const validateSignIn = (userInfo:any) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required()
  })
  return schema.validateAsync(userInfo)
}

export default validateSignIn
