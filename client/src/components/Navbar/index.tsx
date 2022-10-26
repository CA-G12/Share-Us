import { FC, useState } from 'react'
import './style.css'
import {
  Typography, Paper, IconButton, InputBase, FormControl,
  Select, MenuItem, SelectChangeEvent, Button,
} from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatIcon from '@mui/icons-material/Chat'
import { useAuth } from '../../hooks/useAuth'
import logo from './logo.jpg'
import DropDown from './DropDown'

const Navbar:FC = () => {
  const [event, setEvent] = useState('event')

  const auth = useAuth()
  const navigate = useNavigate()
  const handleChange = (e: SelectChangeEvent):void => setEvent(e.target.value as string)

  return (
    <header>
      <Link
        to="/"
        className="logo"
      >
        <img src={logo} alt="logo" />
        <Typography
          variant="h6"
          noWrap
          component="h5"
          sx={{ color: '#2A2A2A' }}
        >
          SHARE US
        </Typography>
      </Link>
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
        <div className="icons">
          <ChatIcon onClick={() => { navigate('/chat') }} sx={{ cursor: 'pointer' }} />
          <CalendarMonthIcon
            onClick={() => { navigate('/calender') }}
            sx={{ cursor: 'pointer' }}
          />
          <NotificationsIcon sx={{ cursor: 'pointer' }} />
        </div>
        {auth.user
          ? (
            <DropDown />
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

  )
}

export default Navbar
