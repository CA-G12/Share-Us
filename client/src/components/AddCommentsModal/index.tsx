import {
  FC, Dispatch, SetStateAction, useRef, useState,
} from 'react'
import {
  Button, Modal, Typography, TextField, Box, IconButton,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams, useNavigate } from 'react-router-dom'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
// import Picker from 'emoji-picker-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import ApiService from '../../services/ApiService'
import './style.css'
import { IOneComment } from '../../interfaces'
import { useAuth } from '../../hooks/useAuth'
import Uploader from '../Uploader'

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

  const [content, setContent] = useState('')
  const ref = useRef<any>(null)
  const onEmojiClick = (event:any):any => {
    const cursor = ref.current.selectionStart
    ref.current.focus()
    const text = content.slice(0, cursor) + event.native + content.slice(cursor)
    setContent(text)
  }
  const [openEmoji, setOpenEmoji] = useState<boolean>(false)
  const handleOpenEmoji = ():void => {
    setOpenEmoji(true)
  }
  const handleCloseEmoji = ():void => {
    setOpenEmoji(false)
  }

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
    p: 5,
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
          className="add-form"
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
            inputRef={ref}
            value={formik.values.content + content}
            onChange={(e) => {
              formik.handleChange(e)
              setContent('')
            }}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <IconButton
            className="Emoji-Btn"
            color="primary"
            aria-label="add to shopping cart"
            onClick={handleOpenEmoji}
          >
            <EmojiEmotionsOutlinedIcon />
          </IconButton>

          <Uploader formik={formik} name="image" btnName="image" />
          <Button
            startIcon={<AddOutlinedIcon sx={{ fill: 'white' }} />}
            type="submit"
            variant="contained"
            fullWidth
            className="add-btn"
            sx={{ backgroundColor: '#2A2A2A', color: 'white', textTransform: 'capitalize' }}
          >
            Add Comment
          </Button>

        </form>
        <Modal
          open={openEmoji}
          onClose={handleCloseEmoji}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="picker-container"
          >
            <Picker
              style={{ width: '300' }}
              data={data}
              onEmojiSelect={onEmojiClick}
              perLine={6}
            />
          </Box>
        </Modal>

      </Box>
    </Modal>
  )
}

export default AddCommentModal
