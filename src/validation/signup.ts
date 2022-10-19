import { userData } from 'interfaces/userData'
import * as joi from 'joi'

const validateSignup = (data: userData) => {
  const schema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref('password'),
    username: joi.string().min(2).required()
  })

  return schema.validateAsync(data)
}
export default validateSignup
