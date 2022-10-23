/* eslint-disable no-unused-vars */
import { FC, useState, useEffect } from 'react'
import {
  Button, Typography, TextField, Box,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import './style.css'
import IEditProfile from '../../interfaces/props/IEditProfile'
import IUserProfile from '../../interfaces/IUserProfile'

const EditProfile:FC<IEditProfile> = ({ getUserData, userData }) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<Partial<IUserProfile>>()

  useEffect(() => {
    setData({
      username: userData?.username || '',
      bio: userData?.bio || '',
      profileImg: userData?.profileImg || '',
      headerImg: userData?.headerImg || '',
      location: userData?.location || '',
    })
  }, [userData])

  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)
  const handleChange = (key:any, value:any):void => {
    setData({ ...data, [key]: value })
  }

  return (
    <div className="edit-popup">
      <Button
        onClick={handleOpen}
        sx={{
          fontSize: 12,
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
        Edit profile

      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
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
              color: 'rgba(42, 42, 42, 1)',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            Edit Profile
          </Typography>
          <div className="inputs">
            <TextField
              label="username"
              id="outlined-size-small"
              size="small"
              name="username"
              sx={{ width: '100%' }}
              value={data?.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              label="biography"
              InputProps={{
                rows: 3,
              }}
              sx={{ width: '100%' }}
              value={data?.bio || ''}
              onChange={(e) => handleChange('bio', e.target.value)}

            />
            <TextField
              label="Profile picture"
              id="outlined-size-small"
              size="small"
              sx={{ width: '100%' }}
              value={data?.profileImg}
              onChange={(e) => handleChange('profileImg', e.target.value)}

            />
            <TextField
              label="Header picture"
              id="outlined-size-small"
              size="small"
              sx={{ width: '100%' }}
              value={data?.headerImg}
              onChange={(e) => handleChange('headerImg', e.target.value)}

            />
            <TextField
              label="Location"
              id="outlined-size-small"
              size="small"
              sx={{ width: '100%' }}
              value={data?.location}
              onChange={(e) => handleChange('location', e.target.value)}

            />
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setOpen(false)
                getUserData(data)
              }}
              sx={{
                width: '80%',
                alignSelf: 'center',
                background: '#2A2A2A',
                boxShadow: '0px 1px 2px rgba(105, 81, 255, 0.05)',
                borderRadius: '8px',
                textTransform: 'capitalize',
                fontSize: '0.7rem',
                color: '#EEF3FF',
              }}
            >
              Edit profile
            </Button>
          </div>

        </Box>
      </Modal>
    </div>
  )
}

export default EditProfile
