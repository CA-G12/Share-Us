import './style.css'

import React, { FC, useState } from 'react'
import {
  Button, Alert, AlertTitle, CircularProgress,
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Comment from '../Comment'
import ApiService from '../../services/ApiService'
import {
  IComments,
  IOneComment,
} from '../../interfaces'
import AddCommentModal from '../AddCommentsModal'

const CommentsContainer:FC = () => {
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

  const [newComment, setNewComments] = useState<any>(initOneCommentValue)
  const [nextPage, setNextPage] = useState<number>(1)
  const [allComments, setAllComments] = useState<IComments[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<boolean | string>(false)
  const [loader, setLoader] = useState<boolean>(true)

  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)
  const handleShowMore = ():void => setNextPage(nextPage + 1)

  const idParams = useParams().id

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const result = await ApiService.get(`/events/${idParams}/comments?offset=${nextPage}`)
        setAllComments([...allComments, ...result.data.data])
        if (!result.data.data.length) setHasMore(false)
        setLoader(false)
      } catch (err:any) {
        setError(err.response.message)
        setLoader(false)
      }
    })()
  }, [idParams, nextPage])

  React.useEffect(() => {
    setAllComments([newComment.data, ...allComments])
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
        startIcon={<AddOutlinedIcon sx={{ fill: 'white' }} />}
        onClick={handleOpen}
        variant="contained"
        sx={{
          backgroundColor: '#2A2A2A',
          textTransform: 'capitalize',
        }}
      >
        Add Comment
      </Button>

      <InfiniteScroll
        dataLength={allComments.length}
        next={handleShowMore}
        hasMore={hasMore}
        loader={<CircularProgress sx={{ margin: '10px auto', display: 'block' }} />}
      >
        {!allComments.length ? 'No comments found' : allComments.map((ele:any) => (
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

      </InfiniteScroll>

      <AddCommentModal
        handleClose={handleClose}
        open={open}
        setNewComments={setNewComments}
      />
    </div>

  )
}

export default CommentsContainer
