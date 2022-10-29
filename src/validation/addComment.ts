import { IComment } from '../interfaces/IComment'
import joi from 'joi'
// (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpeg|jpg|gif|png)/g)
const validateComment = (data: IComment) => {
  const imagePattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpeg|jpg|gif|png)/i
  const schema = joi.object({
    image: joi.string().uri().pattern(imagePattern),
    content: joi.string()
  }).or('image', 'content')

  return schema.validateAsync(data)
}
export default validateComment
