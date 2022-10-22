import { FC, useState } from 'react'
import { Typography, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import UserProfileProp from '../../interfaces/props/UserProfileProp'
import './style.css'
// import EditProfile from '../EditProfile'
import ApiService from '../../services/ApiService'
import Following from '../following'

const ProfileBio:FC<UserProfileProp> = ({
  // eslint-disable-next-line no-unused-vars
  userData, getUserData, allData, setUserData,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const { followerId } = useParams()

  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)

  const followUser = async ():Promise<void> => {
    try {
      const follow = await ApiService.patch(`/api/v1/users/1/followers/${followerId}`, {})
      setUserData(follow.data.data[0])
    } catch (err) {
      console.log(err)
    }
  }

  const blockUser = async (): Promise<void> => {
    try {
      const block = await ApiService.patch(`/api/v1/users/1/blocked/${followerId}`, {})
      setUserData(block.data.data[0])
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="profile">
      <div className="header-img">
        <img
          src={userData?.headerImg}
          alt="header-img"
        />
      </div>
      <div className="container-info">
        <div className="bio-infos">
          <div className="profile-img">
            <img
              src={userData?.profileImg}
              alt=""
            />
          </div>

          <Typography variant="h5" gutterBottom>{userData?.username}</Typography>
          <div className="friends">
            <Typography
              variant="subtitle2"
              gutterBottom
              onClick={handleOpen}
              sx={{ fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              Following:
              {' '}
              {userData?.following?.length}

            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              Followers:
              {' '}
              {userData?.followers?.length}

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
              {userData?.bio}
            </Typography>
          </div>

        </div>
        <Button
          sx={{
            fontSize: 12,
            background: 'rgba(164, 42, 42, 1)',
            color: '#fff',
            fontWeight: 600,
            padding: '0.3rem 1.5rem',
            textTransform: 'capitalize',
            position: 'absolute',
            right: '4rem',
            top: '0.5rem',
            '&:hover': {
              background: 'rgba(164, 42, 42, 1)',
            },
          }}
          onClick={blockUser}
        >
          {userData?.blocked?.includes(Number(followerId))
            ? 'Unblock' : 'Block'}
        </Button>

        {!userData?.blocked?.includes(Number(followerId))
        && (
        <Button
          sx={{
            fontSize: 12,
            background: 'rgba(1, 113, 59, 1)',
            color: '#fff',
            fontWeight: 600,
            padding: '0.3rem 1.5rem',
            textTransform: 'capitalize',
            position: 'absolute',
            right: '10rem',
            top: '0.5rem',
            '&:hover': {
              background: 'rgba(1, 113, 59, 1)',
            },
          }}
          onClick={followUser}
        >
          {userData?.followers.includes(Number(followerId))
            ? 'UnFollow' : 'Follow'}
        </Button>
        )}
        {/* <EditProfile getUserData={getUserData} userData={userData} /> */}
        <Following
          open={open}
          handleClose={handleClose}
          title="Following"
          url="/api/v1//users/1/following"
        />
      </div>
    </div>
  )
}

export default ProfileBio
