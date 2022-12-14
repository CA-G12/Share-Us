import { FC, useState } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import Stack from '@mui/material/Stack'
import './style.css'
import { toast } from 'react-toastify'
import { IUploaderProps } from '../../interfaces/props/IUploaderProps'

const Uploader:FC<IUploaderProps> = ({
  name, formik, btnName,
}) => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = (e:any):void => {
    const data = new FormData()

    data.append('file', e.target.files[0])
    data.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`)
    data.append('cloud_name', `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`)

    fetch(`${process.env.REACT_APP_CLOUDINARY_UPLOAD_LINK}`, {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data1) => {
        setUrl(data1.url)
        formik.setFieldValue(name, data1.url)
        setLoading(false)
      })
      .catch(() => toast.error('Please, try again'))
  }
  return (
    <div className="upload-container">
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          variant="contained"
          component="label"
          sx={{
            margin: 'auto',
            background: '#2A2A2A',
            textTransform: 'none',
            '&:hover': {
              background: '#2A2A2A',
            },
          }}
        >
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
