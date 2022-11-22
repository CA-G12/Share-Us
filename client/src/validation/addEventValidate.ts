import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  startTime: yup.date().max(yup.ref('endTime'), 'start time must be less than end time')
    .required(),
  endTime: yup.date().min(yup.ref('startTime'), 'end time must be greater than start time')
    .required(),
  img: yup.string().matches(/\.(jpe?g|png|gif|bmp)$/i).required(),
  longitude: yup.string().required(),
  latitude: yup.string().required(),
  placeName: yup.string().required(),
  hashtag: yup.array().of(yup.string()),
})

export default schema
