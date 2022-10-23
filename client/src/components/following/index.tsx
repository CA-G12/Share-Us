/* eslint-disable no-unused-vars */
import { FC, useState, useEffect } from 'react'
import {
  Button, Typography, TextField, Box,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import './style.css'
import IModalProps from '../../interfaces/props/IModal'
import ApiService from '../../services/ApiService'
import IUserProfile from '../../interfaces/IUserProfile'

const Following:FC<IModalProps> = ({
  handleClose, open, title, url,
}) => {
  const [users, setUsers] = useState<IUserProfile[] | []>([])
  useEffect(() => {
    try {
      const followingUser = async ():Promise<void> => {
        const allFollowing = await ApiService.get(url)
        setUsers(allFollowing.data.data)
        console.log(allFollowing.data.data)
      }
      followingUser()
    } catch (err) {
      setUsers([])
    }
  }, [])
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
            {title === 'Following' ? 'Following' : title === 'Followers' ? 'Followers' : 'Blocked'}
          </Typography>
          <hr />
          {users.length ? users.map((e:IUserProfile) => (
            <div className="user" key={e.id}>
              <div className="username">
                <img
              // eslint-disable-next-line max-len
                  src={e.profileImg}
                  alt=""
                />
                <Typography sx={{ fontWeight: 600 }}>{e.username}</Typography>
              </div>
              <Button sx={{
                textTransform: 'capitalize',
                border: '1px solid rgba(42, 42, 42, 0.5)',
                boxShadow: 'inset 0px -1px 0px rgba(14, 14, 44, 0.4)',
                borderRadius: '4px',
                color: 'rgba(42, 42, 42, 1)',
              }}
              >
                {title === 'Following' ? 'Unfollow' : title === 'Followers' ? 'follow' : 'unblock'}

              </Button>
            </div>
          )) : (
            <Typography
              sx={{ margin: '1rem auto', textAlign: 'center' }}
            >
              {title === 'Following'
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
