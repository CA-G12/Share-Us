import { FC, Dispatch, SetStateAction } from 'react'
import {
  Button, Modal, Typography, TextField, Box,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams, useNavigate } from 'react-router-dom'
import ApiService from '../../services/ApiService'
import './style.css'
import { IOneComment } from '../../interfaces'
import { useAuth } from '../../hooks/useAuth'

const validationSchema = yup.object().shape({
  content: yup.string()
    .when('image', {
      is: (val: any) => !!val,
      then: yup.string(),
      otherwise: yup.string().required('one field at least required'),
    }),
  image: yup.string()
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpeg|jpg|gif|png)/g)
    .when('content', {
      is: (val: any) => !!val,
      then: yup.string(),
      otherwise: yup.string().required('one field at least required'),
    }),
}, [['image', 'content']])

interface modalProps {
  open: boolean;
  handleClose: ()=>void;
  setNewComments: Dispatch<SetStateAction<IOneComment>>;
}

const AddCommentModal:FC<modalProps> = ({
  open, handleClose, setNewComments,
}) => {
  const useAuthorization = useAuth()
  const userId = useAuthorization.user?.id
  const idParams = useParams().id
  const navigate = useNavigate()

  const onSubmitAddComment = async (values:any):Promise<any> => {
    const body: {
      content?: string,
      image?: string,
    } = {
      content: values.content,
      image: values.image,
    }
    const testContent:string = values.content!
    const testImage:string = values.image!
    if (testContent.trim() === '') {
      delete body.content
    }
    if (testImage.trim() === '') {
      delete body.image
    }
    try {
      if (userId) {
        const newComment = await ApiService.post(`/events/${idParams}/comments`, body)
        handleClose()
        setNewComments(newComment.data)
        toast(newComment.data.message)
      } else {
        navigate('/login')
      }
    } catch (error:any) {
      toast(error.response.data.message)
    }
  }

  const formik:any = useFormik({
    initialValues: {
      content: '',
      image: '',
    },
    validationSchema,
    onSubmit: onSubmitAddComment,
  })

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 420,
    bgcolor: '#fff',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="add-modal">

        <form
          onSubmit={formik.handleSubmit}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Comments
          </Typography>
          <TextField
            className="first-input"
            label="Content"
            variant="outlined"
            name="content"
            id="outlined-multiline-static"
            multiline
            fullWidth
            rows={4}
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <TextField
            id="outlined-basic"
            label="select image"
            variant="outlined"
            fullWidth
            className="inputs"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          />
          <Button
            type="submit"
            variant="contained"
            className="inputs"
            sx={{ backgroundColor: '#2A2A2A' }}
          >
            {/* <AddOutlinedIcon /> */}
            Add Comments
          </Button>

        </form>
      </Box>
    </Modal>
  )
}

export default AddCommentModal
