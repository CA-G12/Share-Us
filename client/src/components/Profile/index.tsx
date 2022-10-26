import { FC, useState } from 'react'
import { Typography, Button } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserProfileProp from '../../interfaces/props/UserProfileProp'
import { useAuth } from '../../hooks/useAuth'
import './style.css'
import EditProfile from '../EditProfile'
import ApiService from '../../services/ApiService'
import Following from '../following'

const ProfileBio:FC<UserProfileProp> = ({
  // eslint-disable-next-line no-unused-vars
  userData, getUserData, allData, setUserData,
}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [followOpen, setFollowOpen] = useState<boolean>(false)
  const { followerId } = useParams()

  const auth = useAuth()

  const handleOpen = ():void => {
    setOpen(true)
  }
  const handleClose = ():void => {
    setOpen(false)
  }

  const handleOpenFollow = ():void => {
    setFollowOpen(true)
  }

  const handleCloseFollow = ():void => {
    setFollowOpen(false)
  }

  const followUser = async (id:number):Promise<void> => {
    try {
      const follow = await ApiService.patch(`/users/following/${id}`, {})
      setUserData(follow.data.data[0])
      auth.setUser(follow.data.authUser[0])
    } catch (err:any) {
      if (err?.response?.status === 400) {
        toast(err?.response?.data?.message)
      } else {
        toast('something went wrong')
        navigate('/login')
      }
    }
  }

  const modalFollow = async (id:number):Promise<void> => {
    try {
      const follow = await ApiService.patch(`/users/following/${id}`, {})
      auth.setUser(follow.data.authUser[0])
    } catch (err:any) {
      if (err?.response?.status === 400) {
        toast(err?.response?.data?.message)
      } else {
        toast('something went wrong')
        navigate('/login')
      }
    }
  }

  const blockUser = async (): Promise<void> => {
    try {
      const block = await ApiService.patch(`/users/blocked/${followerId}`, {})
      setUserData(block.data.data)
      const [user] = block.data.authUser
      auth.setUser(user)
    } catch (err) {
      navigate('/login')
    }
  }

  return (
    <div className="profile">
      <div className="header-img">
        <img
          src={
           auth.user?.id === Number(followerId) ? auth.user?.headerImg : userData?.headerImg
          }
          alt="header-img"
        />
      </div>
      <div className="container-info">
        <div className="bio-infos">
          <div className="profile-img">
            <img
              src={auth.user?.id === Number(followerId)
                ? auth.user?.profileImg : userData?.profileImg}
              alt=""
            />
          </div>

          <Typography variant="h5" gutterBottom>
            {auth.user?.id === Number(followerId)
              ? auth.user?.username : userData?.username}

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
              {auth.user?.id === Number(followerId)
                ? auth.user?.following?.length : userData?.following?.length}

            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              onClick={handleOpenFollow}
              sx={{ fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              Followers:
              {' '}
              {auth.user?.id === Number(followerId)
                ? auth.user?.followers?.length : userData?.followers?.length}

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

        {auth.user?.id === Number(followerId)
          ? <EditProfile getUserData={getUserData} userData={userData} />
          : (
            <>
              {!auth.user?.blocked?.includes(Number(followerId))
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
          onClick={() => followUser(Number(followerId))}
        >
          {userData?.followers?.includes(Number(auth.user?.id))
            ? 'UnFollow' : 'Follow'}
        </Button>
        )}
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
                {auth.user?.blocked?.includes(Number(followerId))
                  ? 'Unblock' : 'Block'}
              </Button>
            </>

          )}
        <Following
          open={open}
          handleClose={handleClose}
          title="Followings"
          setOpen={setOpen}
          url={`/users/${followerId}/following`}
          button="follow"
          action={modalFollow}
        />
        <Following
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
