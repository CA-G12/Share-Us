/* eslint-disable no-useless-escape */
// import './style.css'

import { FC, Dispatch, SetStateAction } from 'react'
import {
  Button, Modal, Typography, TextField, Box,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ApiService from '../services/ApiService'
import { IOneComment } from '../interfaces'

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

const AddCommentModal:FC<modalProps> = ({ open, handleClose, setNewComments }) => {
  const formik:any = useFormik({
    initialValues: {
      content: '',
      image: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const newComment = await ApiService.post(
          '/api/v1/events/1/comments',
          { content: values.content, image: values.image },
        )
        setNewComments(newComment.data)
      } catch (err) {
        console.log(err)
      }
    },
  })

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        <form
          onSubmit={formik.handleSubmit}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Comments
          </Typography>
          <TextField
            id="outlined-basic"
            label="Content"
            variant="outlined"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <TextField
            id="outlined-basic"
            label="select image"
            variant="outlined"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: '#2A2A2A' }}
          >
            <AddOutlinedIcon />
            Add Comments
          </Button>

        </form>
      </Box>
    </Modal>
  )
}

export default AddCommentModal
