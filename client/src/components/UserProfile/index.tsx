import { FC, useState } from 'react'
import { Typography } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import UserProfileProp from '../../interfaces/props/UserProfileProp'
import { useAuth } from '../../hooks/useAuth'
import ApiService from '../../services/ApiService'
import UserAudience from '../UserAudience'
import './style.css'
import ProfileActions from './ProfileActions'
import { useFollowing } from '../../hooks/useFollowing'

const ProfileBio:FC<UserProfileProp> = ({
  userData, editUserData, allData, setUserData,
}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [followOpen, setFollowOpen] = useState<boolean>(false)
  const { followerId } = useParams()
  const followingHook = useFollowing()

  const auth = useAuth()
  const user = auth.user?.id === Number(followerId) ? auth.user : userData

  const socket = io('http://localhost:8080/notifications')

  const sendNotification = (message:any):void => {
    socket.emit('followNotification', message)
  }

  const handleOpen = ():void => { setOpen(true) }
  const handleClose = ():void => { setOpen(false) }

  const handleOpenFollow = ():void => { setFollowOpen(true) }
  const handleCloseFollow = ():void => { setFollowOpen(false) }

  const followUser = async (id:number):Promise<void> => {
    if (auth.user) {
      const follow = await ApiService.patch(`/api/v1/users/following/${id}`, {})
      setUserData(follow.data.data[0])
      auth.setUser(follow.data.authUser[0])
      sendNotification({
        senderInfo: {
          id: auth.user.id,
          username: auth.user.username,
          profileImg: auth.user.profileImg,
        },
        receiverId: id,
        receiverName: follow.data.data[0].username,
        message: `${auth.user.username} started following you`,
        createdAt: new Date(),
        status: 'unread',
      })
    } else {
      navigate('/login')
    }
  }

  const modalFollow = async (id:number):Promise<void> => {
    const isDone = await followingHook.followUser(id)
    if (!isDone) {
      navigate('/login')
    }
  }

  const blockUser = async (): Promise<void> => {
    if (auth.user) {
      const block = await ApiService.patch(`/api/v1/users/blocked/${followerId}`, {})
      setUserData(block.data.data)
      const [userInfos] = block.data.authUser
      auth.setUser(userInfos)
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="profile">
      <div className="header-img">
        <img
          src={user?.headerImg}
          alt="header-img"
        />
      </div>
      <div className="container-info">
        <div className="bio-infos">
          <div className="profile-img">
            <img
              src={user?.profileImg}
              alt=""
            />
          </div>

          <Typography variant="h5" gutterBottom>
            {user?.username}

          </Typography>
          <div className="friends">
            <Typography
              variant="subtitle2"
              gutterBottom
              onClick={handleOpen}
              sx={{ fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              Followings:
              {' '}
              {user?.following?.length}

            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              onClick={handleOpenFollow}
              sx={{ fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              Followers:
              {' '}
              {user?.followers?.length}

            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontSize: 12, fontWeight: 600 }}
            >
              Events:
              {' '}
              {allData?.length}

            </Typography>
          </div>
          <div className="bio">
            <Typography
              variant="subtitle1"
              sx={{ fontSize: 15, fontWeight: 600, marginTop: '10px' }}
            >
              Bio:
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontSize: '12px' }}
            >
              {user?.bio}
            </Typography>
          </div>
        </div>

        <ProfileActions
          userData={userData}
          blockUser={blockUser}
          followUser={followUser}
          editUserData={editUserData}
        />
        <UserAudience
          open={open}
          handleClose={handleClose}
          title="Followings"
          setOpen={setOpen}
          url={`/users/${followerId}/following`}
          button="follow"
          action={modalFollow}
        />
        <UserAudience
          open={followOpen}
          handleClose={handleCloseFollow}
          title="Followers"
          setOpen={setFollowOpen}
          url={`/users/${followerId}/followers`}
          button="follow"
          action={modalFollow}
        />
      </div>
    </div>
  )
}

export default ProfileBio
