import { FC, useState, useEffect } from 'react'
import {
  useNavigate, Link, useSearchParams, useLocation, createSearchParams,
} from 'react-router-dom'

import './style.css'
import {
  Typography, Paper, IconButton, InputBase, FormControl,
  Select, MenuItem, SelectChangeEvent, Button, Badge,
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatIcon from '@mui/icons-material/Chat'
import io from 'socket.io-client'
import { useAuth } from '../../hooks/useAuth'
import logo from './logo.jpg'
import DropDown from './DropDown'
import { sx } from './styledMenu'
import NotificationsList from '../NotificationsList/Notifications'

const Navbar:FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [category, setCategory] = useState<string>('event')
  const [search, setSearch] = useState<string>('')
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams()
  const [openNotifications, setOpenNotifications] = useState(false)
  const handleCloseNotification = ():void => setOpenNotifications(false)
  const handleOpenNotification = ():void => setOpenNotifications(true)

  const handleSearch = ():void => {
    if (location.pathname !== '/search') {
      navigate({
        pathname: '/search',
        search: `${createSearchParams({ category, q: search })}`,
      })
    } else {
      setSearchParams({
        category,
        q: search,
      })
    }
  }
  const auth = useAuth()
  const handleChange = (e: SelectChangeEvent):void => setCategory(e.target.value as string)

  interface INotifications {
  message:string;
  profileImg:string;
  senderName:string;
  senderId:number;
}
  const socket = io('http://localhost:8080/notifications')
  const [realTimeNotifications, setRealTimeNotifications] = useState<INotifications[]>([])
  const [isConnect, setIsConnect] = useState<boolean>(false)
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnect(socket.connected) // true
    })
    if (auth?.user?.username) socket.emit('newUser', auth.user.username)

    socket.on('getNotification', (msg) => {
      setRealTimeNotifications((prev) => [...prev, msg])
    })

    socket.on('disconnect', () => {
      setIsConnect(socket.connected)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])
  return (
    <>
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
            name="input"
            sx={sx.paperForm}
          >
            <FormControl sx={{ width: 80 }}>
              <Select
                sx={sx.select}
                className="select"
                size="small"
                value={category}
                onChange={handleChange}
                displayEmpty
                name="category"
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem sx={{ fontSize: 12 }} selected value="event">event</MenuItem>
                <MenuItem sx={{ fontSize: 12 }} value="friends">friends</MenuItem>
                <MenuItem sx={{ fontSize: 12 }} value="hashtags">hashtags</MenuItem>
              </Select>
            </FormControl>
            <InputBase
              placeholder="Search here"
              value={search}
              name="input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              type="button"
              aria-label="search"
              className="search-btn"
              onClick={handleSearch}
            >
              search
            </IconButton>
          </Paper>
        </div>
        <div className="register">
          <div className="icons">
            <ChatIcon onClick={() => { navigate('/chat') }} sx={{ cursor: 'pointer' }} />
            <CalendarMonthIcon
              onClick={() => { navigate('/calendar') }}
              sx={{ cursor: 'pointer' }}
            />

            <IconButton onClick={handleOpenNotification}>
              <Badge badgeContent={realTimeNotifications.length} color="primary">
                <NotificationsIcon sx={{ cursor: 'pointer' }} />
              </Badge>
            </IconButton>

          </div>

          {auth.user && <DropDown />}
          {!auth.user && (
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

      {openNotifications && (
      <NotificationsList
        openNotifications={openNotifications}
        handleClose={handleCloseNotification}
        realTimeNotifications={realTimeNotifications}
      />
      )}
    </>

  )
}

export default Navbar
