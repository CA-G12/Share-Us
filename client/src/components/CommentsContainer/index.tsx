import './style.css'

import { FC, useState, useEffect } from 'react'
import {
  Button, Alert, AlertTitle, CircularProgress, Typography,
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Comment from '../Comment'
import ApiService from '../../services/ApiService'
import {
  IComments,
  IOneComment,
  IEventOwner,
} from '../../interfaces'
import AddCommentModal from '../AddCommentsModal'

interface CommentsContainerProps{
  eventOwner:IEventOwner
  eventName:string
}

const CommentsContainer:FC<CommentsContainerProps> = ({ eventOwner, eventName }) => {
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
  const [deletedId, setDeletedId] = useState<number[]>([])

  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)
  const handleShowMore = ():void => setNextPage(nextPage + 1)

  const idParams = useParams().id

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const result = await
        ApiService.get(`/api/v1/events/${idParams}/comments?offset=${nextPage}`)
        setAllComments([...allComments, ...result.data.data])
        if (!result.data.data.length) setHasMore(false)
        setLoader(false)
      } catch (err:any) {
        setError(err.response.message)
        setLoader(false)
      }
    })()
  }, [idParams, nextPage])

  useEffect(() => {
    setAllComments([newComment.data, ...allComments])
  }, [newComment])

  const handleDelete = async (id:number):Promise<void> => {
    const deletedEvent = await ApiService.delete(`api/v1/events/${idParams}/comments/${id}`)
    if (deletedEvent.data.status === 'deleted') {
      setDeletedId([...deletedId, id])
      toast.info(deletedEvent.data.message)
    }
  }

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
        {!allComments.length ? <Typography className="end-message">No comments found</Typography>
          : allComments.filter((comment:any) => !deletedId.includes(comment.id)).map((ele:any) => (
            <Comment
              key={ele.id * Math.random()}
              id={ele.id}
              User={ele.User}
              image={ele.image}
              content={ele.content}
              createdAt={ele.createdAt}
              handleDelete={handleDelete}
            />
          ))}

      </InfiniteScroll>

      <AddCommentModal
        handleClose={handleClose}
        open={open}
        setNewComments={setNewComments}
        eventOwner={eventOwner}
        eventId={idParams}
        eventName={eventName}
      />
    </div>

  )
}

export default CommentsContainer
