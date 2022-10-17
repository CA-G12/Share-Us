import './style.css'
import { FC } from 'react'
import profile from '../../assets/images/profile.png'
import commentPic from '../../assets/images/commentPic.png'

const Comment:FC = () => (
  <div className="comment">
    <div className="user-info">
      <img src={profile} alt="profile-img" />
      <div>
        <p className="username">saif hayek</p>
        <p className="date">2022-09-10 at 09:57:55</p>
      </div>
    </div>
    <p className="comment-content">Nice day with friends</p>
    <img className="comment-img" src={commentPic} alt="" />
  </div>
)

export default Comment
