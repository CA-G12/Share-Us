import joi from 'joi'

const EditProfileSchema = joi.object({
  username: joi.string().min(3).required(),
  bio: joi.string().allow(null, ''),
  profileImg: joi.string().allow(null, ''),
  location: joi.string().allow(null, ''),
  headerImg: joi.string().allow(null, '')
})

export default EditProfileSchema
