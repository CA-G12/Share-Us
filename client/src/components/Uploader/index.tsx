import { FC, useState } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import Stack from '@mui/material/Stack'
import './style.css'
import { toast } from 'react-toastify'
import { FormikProps } from 'formik'

interface IUploaderProps {
  name: string
  formik:FormikProps<any>
  btnName: string
}
const Uploader:FC<IUploaderProps> = ({ name, formik, btnName }) => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = (e:any):void => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', 'shamskhodary')
    data.append('cloud_name', 'dobsqpncd')

    fetch('https://api.cloudinary.com/v1_1/dobsqpncd/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data1) => {
        setUrl(data1.url)
        formik.setFieldValue(name, data1.url)
        setLoading(false)
      })
      .catch(() => toast('Please, try again'))
  }
  return (
    <div className="upload-container">
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button variant="contained" component="label" sx={{ margin: 'auto' }}>
          <input
            type="file"
            hidden
            onChange={(e:any) => {
              setLoading(true)
              setUrl('')
              uploadImage(e)
            }}
            name={name}
          />
          {btnName}
        </Button>
      </Stack>
      {
        url && (
        <div className="img-box">
          <img src={url} alt="img" className="uploaded-img" />
        </div>
        )
      }
      {
         loading && (
         <div className="loading">
           <CircularProgress />
         </div>
         )
      }

    </div>
  )
}
export default Uploader
