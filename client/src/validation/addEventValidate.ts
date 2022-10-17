import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  startTime: yup.date().required(),
  endTime: yup.date().required(),
  img: yup.string().matches(/\.(jpe?g|png|gif|bmp)$/i).required(),
  status: yup.string().oneOf(['in-progress', 'closed', 'upcoming']).required(),
  longitude: yup.number().required(),
  latitude: yup.number().required(),
  hashtag: yup.string().required(),
})

export default schema
