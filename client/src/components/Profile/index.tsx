import { FC } from 'react'
import { Button, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import UserProfileProp from '../../interfaces/props/UserProfileProp'
import './style.css'

const ProfileBio:FC<UserProfileProp> = ({ userData }) => (
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
            Following: 12

          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontSize: 12, fontWeight: 600 }}
          >
            Followers: 50

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
      <Button sx={{
        fontSize: 10,
        background: '#5C5858',
        color: '#fff',
        fontWeight: 600,
        padding: '0.3rem 1rem',
        textTransform: 'capitalize',
        position: 'absolute',
        right: '2rem',
        top: '0.5rem',
        '&:hover': {
          background: '#5C5858',
        },
      }}
      >
        Edit Profile
        {' '}
        <EditIcon sx={{ fontSize: '12px', marginLeft: 1 }} />
      </Button>
    </div>
  </div>
)

export default ProfileBio
