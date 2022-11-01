import { FC, useState } from 'react'
import {
  useNavigate, Link, useSearchParams, useLocation, createSearchParams,
} from 'react-router-dom'

import './style.css'
import {
  Typography, Paper, IconButton, InputBase, FormControl,
  Select, MenuItem, SelectChangeEvent, Button,
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatIcon from '@mui/icons-material/Chat'
import { useAuth } from '../../hooks/useAuth'
import logo from './logo.png'
import DropDown from './DropDown'
import { sx } from './styledMenu'

const Navbar:FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [category, setCategory] = useState<string>('event')
  const [search, setSearch] = useState<string>('')
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams()

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

  return (
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
          Share Us
        </Typography>
      </Link>
      {auth.user && (
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
      )}
      <div className="register">
        {auth.user && (
        <div className="icons">
          <ChatIcon
            onClick={() => { navigate('/chat') }}
            sx={{ cursor: 'pointer', fill: '#eee' }}
          />
          <CalendarMonthIcon
            onClick={() => { navigate('/calendar') }}
            sx={{ cursor: 'pointer', fill: '#eee' }}
          />
          <NotificationsIcon
            sx={{ cursor: 'pointer', fill: '#eee' }}
          />
        </div>
        )}
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
            SignUp

          </Button>
        </>
        )}

      </div>

    </header>

  )
}

export default Navbar
