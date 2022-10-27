/* eslint-disable no-unused-vars */
import { FC, useState, useEffect } from 'react'
import {
  Button, Typography, TextField, Box,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import IModalProps from '../../interfaces/props/IModal'
import ApiService from '../../services/ApiService'
import IUserProfile from '../../interfaces/IUserProfile'
import { useAuth } from '../../hooks/useAuth'

const Following:FC<IModalProps> = ({
  handleClose, open, title, url, setOpen, button, action,
}) => {
  const [users, setUsers] = useState<IUserProfile[] | []>([])
  const { followerId } = useParams()
  const auth = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    try {
      const followingUser = async ():Promise<void> => {
        const allFollowing = await ApiService.get(url)
        setUsers(allFollowing.data.data)
      }
      followingUser()
    } catch (err) {
      setUsers([])
    }
  }, [open])

  const handleClick = (userId:number):void => {
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

  const removeFollowing = async (userId:number):Promise<void> => {
    try {
      const removed = await ApiService.delete(`/users/follower/${userId}`)
      auth.setUser(removed.data.authUser[0])
    } catch (err) {
      toast('something went wrong')
    }
  }

  return (
    <div className="following-popup">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="joined-container"
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontWeight: '600',
              fontSize: '1.4rem',
              lineHeight: '49px',
              color: ' #2A2A2A',
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
          <hr />
          {users.length ? users.map((e:IUserProfile) => (
            <div className="user" key={e.id}>
              <Box
                className="username"
                onClick={() => {
                  navigate(`/users/${e.id}`)
                  setOpen(false)
                }}

              >
                <img
                  src={e.profileImg}
                  alt=""
                />
                <Typography
                  sx={{ fontWeight: 600, cursor: 'pointer' }}
                >
                  {e.username}

                </Typography>
              </Box>
              <Box sx={
                { display: 'flex', gap: '10px' }
                }
              >

                <Button
                  sx={{
                    textTransform: 'capitalize',
                    border: '1px solid rgba(42, 42, 42, 0.5)',
                    boxShadow: 'inset 0px -1px 0px rgba(14, 14, 44, 0.4)',
                    borderRadius: '4px',
                    color: 'rgba(42, 42, 42, 1)',
                  }}
                  onClick={() => handleClick(Number(e.id))}
                >
                  {
                      ((title === 'Followers' || title === 'Followings')
                      && auth.user?.following.includes(e.id))
                        ? 'Unfollow' : ((title === 'Followers' || title === 'Followings')
                        && auth.user?.id === Number(e.id))
                          ? 'View' : (title === 'Blocked' && !auth.user?.blocked.includes(e.id))
                            ? 'block' : button
                }
                </Button>
                {
                auth.user && auth.user?.followers?.includes(e.id) && (
                  <Button
                    sx={{
                      textTransform: 'capitalize',
                      border: '1px solid rgba(42, 42, 42, 0.5)',
                      boxShadow: 'inset 0px -1px 0px rgba(14, 14, 44, 0.4)',
                      borderRadius: '4px',
                      color: 'rgba(42, 42, 42, 1)',
                    }}
                    onClick={() => removeFollowing(e.id)}
                  >
                    remove follower
                  </Button>
                )
              }
              </Box>

            </div>
          )) : (
            <Typography
              sx={{ margin: '1rem auto', textAlign: 'center' }}
            >
              {title === 'Followings'
                ? 'No Followings Found' : title === 'Followers'
                  ? 'No Followers Found' : 'No Blocked Users Found'}
            </Typography>
          )}

        </Box>
      </Modal>
    </div>
  )
}

export default Following
