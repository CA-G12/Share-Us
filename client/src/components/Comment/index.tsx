import './style.css'
import { FC, useState } from 'react'
import {
  DialogActions, Dialog, DialogTitle, IconButton, Button, Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import ICommentsData from '../../interfaces/props/CommentsProps'
import { useAuth } from '../../hooks/useAuth'

const Comment:FC<ICommentsData> = ({
  id, image, content, createdAt, User, handleDelete,
}) => {
  const userId = useAuth().user.id
  const dateFormat = dayjs(createdAt).format('MMM D, YYYY h:mm A')
  const [open, setOpen] = useState(false)
  const handleClickOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)
  const navigate = useNavigate()

  return (
    <div className="comment">
      <Box className="user-info" onClick={() => { navigate(`/users/${User.id}`) }}>
        <img src={User.profileImg} alt="profile-img" />
        <div>
          <p className="username">{User.username}</p>
          <p className="date">{dateFormat}</p>
        </div>
      </Box>

      {content && <p className="comment-content">{content}</p>}
      {image && <img className="comment-img" src={image} alt="comments-img" />}

      { userId === User.id && (
      <IconButton
        className="delete-comment-btn"
        aria-label="delete"
        onClick={handleClickOpen}
      >
        <DeleteIcon />
      </IconButton>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete the comment?
        </DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>cancel</Button>
          <Button
            color="error"
            onClick={() => { handleClose(); handleDelete(id) }}
            autoFocus
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Comment
