import './style.css'

import { FC } from 'react'
import {
  Button,
} from '@mui/material'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import Comment from '../Comment'

const CommentsContainer:FC = () => (
  <div className="comments-container">
    <Button
      variant="contained"
      sx={{ backgroundColor: '#2A2A2A' }}
    >
      <AddOutlinedIcon />
      Add Comments
    </Button>

    <Comment />
    <Comment />

  </div>
)

export default CommentsContainer
