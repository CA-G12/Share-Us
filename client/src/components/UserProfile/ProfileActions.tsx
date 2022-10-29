import { useParams } from 'react-router-dom'
import { FC } from 'react'
import { Button } from '@mui/material'
import EditProfile from '../EditProfile'
import { useAuth } from '../../hooks/useAuth'
import IProfileActionsProp from '../../interfaces/props/IProfileActionsProps'
import { sx } from './style'

const ProfileActions: FC<IProfileActionsProp> = ({
  editUserData,
  blockUser,
  followUser,
  userData,
}) => {
  const { followerId } = useParams()
  const auth = useAuth()
  const user = auth.user?.id === Number(followerId)
  const isBlocked = auth.user?.blocked?.includes(Number(followerId))
  const isFollower = userData?.followers?.includes(Number(auth.user?.id))
  return (
    <>
      {user && <EditProfile editUserData={editUserData} userData={userData} />}
      {!user && (
        <>
          {!isBlocked && (
            <Button
              className="follow-btn"
              sx={sx.followBtn}
              onClick={() => followUser(Number(followerId))}
            >
              {isFollower ? 'UnFollow' : 'Follow'}
            </Button>
          )}
          <Button sx={sx.blockBtn} onClick={blockUser}>
            {isBlocked ? 'Unblock' : 'Block'}
          </Button>
        </>
      )}
    </>
  )
}

export default ProfileActions
