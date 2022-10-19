import joi from 'joi'

const EditProfileSchema = joi.object({
  username: joi.string().min(3).required(),
  bio: joi.string(),
  profileImg: joi.string(),
  location: joi.string(),
  headerImg: joi.string()
})

export default EditProfileSchema
