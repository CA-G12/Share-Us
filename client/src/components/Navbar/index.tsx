import { FC, useState } from 'react'
import './style.css'
import {
  Typography, Paper, IconButton, InputBase, FormControl,
  Select, MenuItem, SelectChangeEvent, Button,
  Box,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import logo from './logo.jpg'
import Following from '../following'
import { useAuth } from '../../hooks/useAuth'

const Navbar:FC = () => {
  const { followerId } = useParams()
  const [event, setEvent] = useState('event')
  const [blockOpen, setBlockOpen] = useState<boolean>(false)
  const auth = useAuth()
  const navigate = useNavigate()
  const handleChange = (e: SelectChangeEvent):void => setEvent(e.target.value as string)
  const handleOpenBlock = ():void => {
    setBlockOpen(true)
  }

  const handleCloseBlock = ():void => {
    setBlockOpen(false)
  }

  return (
    <>
      <header>
        <Box
          className="logo"
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="logo" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
          >
            SHARE US
          </Typography>
        </Box>
        <div className="search">
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 500,
              height: 30,
              background: 'transparent',
              border: 0,
              outline: 0,
              boxShadow: 0,
            }}
          >
            <FormControl sx={{ width: 80 }}>
              <Select
                sx={{
                  height: 31, fontSize: 12, borderRadius: '5px 0 0 5px',
                }}
                className="select"
                size="small"
                value={event}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem sx={{ fontSize: 12 }} value="event">event</MenuItem>
                <MenuItem sx={{ fontSize: 12 }} value={2}>friend</MenuItem>
                <MenuItem sx={{ fontSize: 12 }} value={3}>hashtags</MenuItem>
              </Select>
            </FormControl>
            <InputBase
              placeholder="Search here"
            />
            <IconButton
              type="button"
              aria-label="search"
              className="search-btn"
            >
              search
            </IconButton>
          </Paper>
        </div>
        <div className="register">
          {auth.user
            ? (
              <>
                <Typography
                  onClick={() => navigate(`/users/${auth.user?.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  {auth.user?.username}

                </Typography>
                {auth.user?.id === Number(followerId)
                && <Typography onClick={handleOpenBlock}>Blocked users</Typography>}
                <Button className="signup-btn" onClick={auth.signOut}>Logout</Button>
              </>
            )
            : (
              <>
                <button
                  type="button"
                  className="login"
                  onClick={() => navigate('/login')}
                >
                  Login

                </button>
                <Button
                  className="signup-btn"
                  onClick={() => navigate('/sign-up')}
                >
                  Sign Up

                </Button>
              </>
            )}

        </div>
      </header>
      <Following
        open={blockOpen}
        handleClose={handleCloseBlock}
        title="Blocked"
        url={`/users/${followerId}/blocked`}
      />
    </>

  )
}

export default Navbar
