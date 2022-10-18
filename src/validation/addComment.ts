import { IComment } from '../interfaces/IComment'
import joi from 'joi'

const validateComment = (data: IComment) => {
  const imagePattern = /\.(jpe?g|png|gif|bmp)$/i
  const schema = joi.object({
    image: joi.string().uri().pattern(imagePattern),
    content: joi.string().min(3).required()
  })

  return schema.validateAsync(data)
}
export default validateComment
