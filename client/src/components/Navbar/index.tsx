import React, { FC, useState, useEffect } from 'react'
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
import logo from './logo.png'
import DropDown from './DropDown'
import { sx } from './styledMenu'
import NotificationsList from '../NotificationsList/Notifications'

const socket = io(`${process.env.REACT_APP_BASE_URL}/notifications`)

const Navbar:FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [category, setCategory] = useState<string>('event')
  const [search, setSearch] = useState<string>('')
  const [, setSearchParams] = useSearchParams()

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
  const [realTimeNotifications, setRealTimeNotifications] = useState<INotifications[]>([])
  const [notificationCount, setNotificationCount] = useState<number>(0)
  const [, setIsConnect] = useState<boolean>(false)
  const oldNotifications = useAuth().user?.notifications

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
  }, [auth.user?.username])

  useEffect(() => {
    const unreadNotifications = oldNotifications?.filter((ele:any) => ele?.status === 'unread')
    setNotificationCount(unreadNotifications?.length)
  }, [oldNotifications])

  // open notifications menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>):any => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = ():void => {
    setAnchorEl(null)
  }
  return (
    <>
      {' '}
      <header>
        <Link
          to="/home"
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
              sx={{ borderRadius: '5px' }}
              onClick={handleSearch}
            >
              search
            </IconButton>
          </Paper>
        </div>

        <div className="register">
          <div className="icons">
            <ChatIcon
              onClick={() => { navigate('/chat') }}
              sx={{ cursor: 'pointer', fill: '#eee' }}
            />
            <CalendarMonthIcon
              onClick={() => { navigate('/calendar') }}
              sx={{ cursor: 'pointer', fill: '#eee' }}
            />

            <IconButton
              onClick={handleClick}
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >

              <Badge
                badgeContent={realTimeNotifications.length
                  ? realTimeNotifications.length + notificationCount : notificationCount}
                color="error"
              >
                <NotificationsIcon sx={{ cursor: 'pointer', fill: '#eee' }} />
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

      <NotificationsList
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={open}
        realTimeNotifications={realTimeNotifications}
        setNotificationCount={setNotificationCount}
      />
    </>
  )
}

export default Navbar
