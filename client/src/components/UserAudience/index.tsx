import { FC, useState, useEffect } from 'react'
import { Button, Typography, Box } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import IModalProps from '../../interfaces/props/IModal'
import ApiService from '../../services/ApiService'
import IUserProfile from '../../interfaces/IUserProfile'
import { useAuth } from '../../hooks/useAuth'
import { sx } from './style'
import './style.css'

const UserAudience: FC<IModalProps> = ({
  handleClose,
  open,
  title,
  url,
  setOpen,
  button,
  action,
}) => {
  const [users, setUsers] = useState<IUserProfile[] | []>([])
  const auth = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    try {
      const followingUser = async (): Promise<void> => {
        const allFollowing = await ApiService.get(url)
        setUsers(allFollowing.data.data)
      }
      followingUser()
    } catch (err) {
      setUsers([])
    }
  }, [open])

  const handleClick = (userId: number): void => {
    if (auth.user) {
      if (auth.user?.id === userId) {
        navigate(`/users/${auth.user?.id}`)
        setOpen(false)
      } else {
        action(userId)
      }
    } else {
      navigate('/login')
    }
  }

  const removeFollowing = async (userId: number): Promise<void> => {
    try {
      const removed = await ApiService.delete(
        `/users/following/${userId}`,
        {},
      )
      auth.setUser(removed.data.authUser[0])
    } catch (err) {
      toast.error('something went wrong')
    }
  }

  const isBlocked = (id:number):boolean => auth.user?.blocked.includes(id)
  const isAuth = (id:number):boolean => auth.user?.id === Number(id)
  const isInFollowing = (id:number):boolean => auth.user?.following.includes(id)
  const isInFollower = (id:number): boolean => auth.user?.followers?.includes(id)

  const getNoDataText = (titles: string): string => {
    let text = ''
    if (titles === 'Followings') {
      text = 'No Followings Found'
    } else if (titles === 'Followers') {
      text = 'No Followers Found'
    } else {
      text = 'No Blocked Users Found'
    }
    return text
  }
  const getButtonText = (titles: string, id:number):string => {
    let text = ''
    if ((titles === 'Followers' || titles === 'Followings') && isInFollowing(id)) {
      text = 'Unfollow'
    } else if ((titles === 'Followers' || titles === 'Followings') && isAuth(id)) {
      text = 'view'
    } else if (titles === 'Blocked' && !isBlocked(id)) {
      text = 'block'
    } else {
      text = button
    }
    return text
  }

  return (
    <div className="following-popup">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="joined-container" sx={sx.popUp}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={sx.title}
          >
            {title}
          </Typography>
          <hr />
          {users.length ? (
            users.map((e: IUserProfile) => (
              <div className="user" key={e.id}>
                <Box
                  className="username"
                  onClick={() => {
                    navigate(`/users/${e.id}`)
                    setOpen(false)
                  }}
                >
                  <img src={e.profileImg} alt="" />
                  <Typography sx={{ fontWeight: 600, cursor: 'pointer' }}>
                    {e.username}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Button
                    sx={sx.buttonAction}
                    onClick={() => handleClick(Number(e.id))}
                  >
                    {getButtonText(title, e.id)}
                  </Button>
                  {auth.user && isInFollower(e.id) && (
                    <Button
                      sx={sx.buttonAction}
                      onClick={() => removeFollowing(e.id)}
                    >
                      remove
                    </Button>
                  )}
                </Box>
              </div>
            ))
          ) : (
            <Typography sx={{ margin: '1rem auto', textAlign: 'center' }}>
              {getNoDataText(title)}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default UserAudience
