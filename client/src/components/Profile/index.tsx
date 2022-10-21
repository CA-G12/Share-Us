import { FC } from 'react'
import { Typography } from '@mui/material'
import UserProfileProp from '../../interfaces/props/UserProfileProp'
import './style.css'
import EditProfile from '../EditProfile'

const ProfileBio:FC<UserProfileProp> = ({ userData, getUserData }) => (
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
            sx={{ fontSize: 12, fontWeight: 600 }}
          >
            Following:
            {' '}
            {userData?.following.length}

          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontSize: 12, fontWeight: 600 }}
          >
            Followers:
            {' '}
            {userData?.followers.length}

          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontSize: 12, fontWeight: 600 }}
          >
            Events: 5

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
      <EditProfile getUserData={getUserData} userData={userData} />
    </div>
  </div>
)

export default ProfileBio
