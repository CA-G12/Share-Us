import { useParams, useNavigate } from 'react-router-dom'
import { FC, useContext } from 'react'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { toast } from 'react-toastify'
import EditProfile from '../EditProfile'
import { useAuth } from '../../hooks/useAuth'
import IProfileActionsProp from '../../interfaces/props/IProfileActionsProps'
import { sx } from './style'
import { StartChat } from '../../context/startChat'

const ProfileActions: FC<IProfileActionsProp> = ({
  editUserData,
  blockUser,
  followUser,
  userData,
}) => {
  const { followerId } = useParams()
  const auth = useAuth()
  const navigate = useNavigate()
  const user = auth.user?.id === Number(followerId)
  const isBlocked = auth.user?.blocked?.includes(Number(followerId))
  const isFollower = userData?.followers?.includes(Number(auth.user?.id))
  const { setStartChat } = useContext(StartChat)

  const handleMessage = ():void => {
    if (userData?.blocked?.includes(auth.user?.id)) {
      toast.error('User is blocked')
    } else {
      setStartChat({
        id: userData?.id,
        profileImg: userData?.profileImg,
        username: userData?.username,
      })
      navigate('/chat')
    }
  }

  return (
    <Box>
      {user && <EditProfile editUserData={editUserData} userData={userData} />}
      {!user && (
      <Box sx={{
        display: 'flex', gap: '10px',
      }}
      >
        {!isBlocked && (
        <>
          <Button
            variant="contained"
            sx={sx.followBtn}
            onClick={() => followUser(Number(followerId))}
          >
            {isFollower ? 'UnFollow' : 'Follow'}
          </Button>
          <Button
            variant="contained"
            sx={sx.messageBtn}
            onClick={handleMessage}
          >
            message
          </Button>
        </>
        )}
        <Button
          sx={sx.blockBtn}
          onClick={blockUser}
          variant="contained"
        >
          {isBlocked ? 'Unblock' : 'Block'}
        </Button>
      </Box>
      )}
    </Box>
  )
}

export default ProfileActions
