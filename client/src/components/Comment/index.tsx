import './style.css'
import { FC } from 'react'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import ICommentsData from '../../interfaces/props/CommentsProps'

const Comment:FC<ICommentsData> = ({
  image, content, createdAt, User,
}) => {
  const dateFormat = new Date(createdAt)
  const createdAtFormatted = `${dateFormat.getHours()}
  :${dateFormat.getMinutes()},${dateFormat.toDateString()}`
  const navigate = useNavigate()
  return (
    <div className="comment">
      <Box className="user-info" onClick={() => { navigate(`/users/${User.id}`) }}>
        <img src={User.profileImg} alt="profile-img" />
        <div>
          <p className="username">{User.username}</p>
          <p className="date">{createdAtFormatted}</p>
        </div>
      </Box>
      {content && <p className="comment-content">{content}</p>}
      {image && <img className="comment-img" src={image} alt="comments-img" />}

    </div>
  )
}
export default Comment
