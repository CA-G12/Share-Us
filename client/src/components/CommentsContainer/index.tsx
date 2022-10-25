/* eslint-disable no-useless-escape */
import './style.css'

import React, { FC, useState } from 'react'
import {
  Button, Alert, AlertTitle, CircularProgress,
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import Comment from '../Comment'
import ApiService from '../../services/ApiService'
import {
  IComments,
  IOneComment,
} from '../../interfaces'
import AddCommentModal from '../AddCommentModal'
// eslint-disable-next-line no-undef
const CommentsContainer:FC = ():any => {
  const initCommentsValue: IComments = {
    message: '',
    data: [
      {
        id: 2,
        content: '',
        image: '',
        createdAt: '',
        updatedAt: '',
        UserId: 1,
        EventId: 1,
        User: {
          id: 1,
          username: '',
          profileImg: '',
        },
      },
    ],
  }

  const initOneCommentValue: IOneComment = {
    message: '',
    data:
      {
        id: 0,
        content: '',
        image: '',
        createdAt: '',
        updatedAt: '',
        UserId: 1,
        EventId: 1,
        User: {
          id: 1,
          username: '',
          profileImg: '',
        },
      },

  }

  const [comments, setComments] = React.useState<IComments>(initCommentsValue)
  const [newComment, setNewComments] = React.useState<IOneComment>(initOneCommentValue)
  const [open, setOpen] = React.useState<boolean>(false)
  const [error, setError] = useState<boolean | string>(false)
  const [loader, setLoader] = useState<boolean>(true)
  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const result = await ApiService.get('/api/v1/events/1/comments')
        setComments(result.data)
        setLoader(false)
      } catch (err) {
        setError('We\'re having some errors in getting the information. We\'re working on it.')
        setLoader(false)
      }
    })()
  }, [])

  React.useEffect(() => {
    setComments({ ...comments, data: [newComment.data, ...comments.data] })
  }, [newComment])

  if (loader) {
    return (
      <CircularProgress sx={{ margin: '200px auto', display: 'block' }} />
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ width: '80%', margin: '20px auto' }}>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    )
  }

  return (
    <div className="comments-container">
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ backgroundColor: '#2A2A2A' }}
      >
        <AddOutlinedIcon />
        Add Comments
      </Button>

      { !comments.data.length
      && (
      <Alert severity="info" sx={{ width: '80%', margin: '50px auto' }}>
        <AlertTitle>no comments</AlertTitle>
        there is no comments yet for this event
      </Alert>
      )}
      {comments.data.map((ele) => (
        <Comment
          key={ele.id * Math.random()}
          id={ele.id}
          User={ele.User}
          image={ele.image}
          content={ele.content}
          createdAt={ele.createdAt}
          EventId={ele.EventId}
        />
      ))}

      <AddCommentModal
        handleClose={handleClose}
        open={open}
        setNewComments={setNewComments}
      />
    </div>

  )
}

export default CommentsContainer
