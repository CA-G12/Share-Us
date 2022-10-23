/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
import './style.css'
import { FC } from 'react'
import ICommentsData from '../../interfaces/props/CommentsProps'

const Comment:FC<ICommentsData> = ({
  id, EventId, image, content, createdAt, User,
}):JSX.Element => {
  const dateFormat = new Date(createdAt)
  const createdAtFormatted = `${dateFormat.getHours()}:${dateFormat.getMinutes()},${dateFormat.toDateString()}`

  return (
    <div className="comment">
      <div className="user-info">
        <img src={User.profileImg} alt="profile-img" />
        <div>
          <p className="username">{User.username}</p>
          <p className="date">{createdAtFormatted}</p>
        </div>
      </div>
      {content && <p className="comment-content">{content}</p>}
      {image && <img className="comment-img" src={image} alt="comments-img" />}

    </div>
  )
}
export default Comment
