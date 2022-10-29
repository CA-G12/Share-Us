import './style.css'

import React, { FC, useState } from 'react'
import {
  Button, Alert, AlertTitle, CircularProgress,
} from '@mui/material'
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

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

  const [comments, setComments] = useState<IComments>(initCommentsValue)
  const [newComment, setNewComments] = useState<any>(initOneCommentValue)
  const [showMore, setShowMore] = useState<number>(1)
  const [allComments, setAllComments] = useState<IComments[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<boolean | string>(false)
  const [loader, setLoader] = useState<boolean>(true)

  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)
  const handleShowMore = ():void => setShowMore(showMore + 1)

  const idParams = useParams().id

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const result = await ApiService.get(`/events/${idParams}/comments?offset=${showMore}`)
        setComments(result.data)
        setAllComments([...allComments, ...result.data.data])
        if (!result.data.data.length) setHasMore(false)
        setLoader(false)
      } catch (err:any) {
        setError(err.message)
        setLoader(false)
      }
    })()
  }, [idParams, showMore])

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
        onClick={handleOpen}
        variant="contained"
        sx={{ backgroundColor: '#2A2A2A' }}
      >
        {/* <AddOutlinedIcon /> */}
        Add Comments
      </Button>

      <InfiniteScroll
        dataLength={allComments.length}
        next={handleShowMore}
        hasMore={hasMore}
        loader={<CircularProgress sx={{ margin: '10px auto', display: 'block' }} />}
        endMessage={<p className="end-message">There are no more Comments</p>}
      >
        {allComments.map((ele:any) => (
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
