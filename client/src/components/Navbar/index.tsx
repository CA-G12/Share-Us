import { FC, useState } from 'react'
import './style.css'
import {
  Typography, Paper, IconButton, InputBase, FormControl,
  Select, MenuItem, SelectChangeEvent, Button, ListItemButton,
  Box,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatIcon from '@mui/icons-material/Chat'
import { KeyboardArrowDown } from '@mui/icons-material'
import People from '@mui/icons-material/People'
import LogoutIcon from '@mui/icons-material/Logout'
import BlockIcon from '@mui/icons-material/Block'
import { useAuth } from '../../hooks/useAuth'
import Following from '../following'
import logo from './logo.jpg'
import ApiService from '../../services/ApiService'

const Navbar:FC = () => {
  const [event, setEvent] = useState('event')
  const [blockOpen, setBlockOpen] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  const auth = useAuth()
  const navigate = useNavigate()
  const handleChange = (e: SelectChangeEvent):void => setEvent(e.target.value as string)
  const handleOpenBlock = ():void => {
    setBlockOpen(true)
  }

  const handleCloseBlock = ():void => {
    setBlockOpen(false)
  }
  const data = [
    { icon: <People />, label: 'View profile' },
    { icon: <BlockIcon />, label: 'Blocked users' },
    { icon: <LogoutIcon />, label: 'Logout' },
  ]

  const modalBlock = async (id:number): Promise<void> => {
    try {
      const block = await ApiService.patch(`/users/blocked/${id}`, {})
      auth.setUser(block.data.authUser[0])
    } catch (err) {
      navigate('/login')
    }
  }
  return (
    <>
      <header>
        <Link
          to="/"
          className="logo"
        >
          <img src={logo} alt="logo" />
          <Typography
            variant="h5"
            noWrap
            component="h5"
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
              <>
                <Typography
                  onClick={() => navigate(`/users/${auth.user?.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  {auth.user?.username}

                </Typography>
                <Typography
                  onClick={handleOpenBlock}
                  sx={{ cursor: 'pointer' }}
                >
                  Blocked users
                </Typography>
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

        <Box
          sx={{
            bgcolor: open ? '#fff' : null,
            pb: open ? 1 : 0,
            p: 0,
            top: 0,
            right: '30rem',
            position: 'absolute',
            paddingBottom: '16px',
            margin: '1rem',
            borderRadius: open ? '20px' : '20px',
          }}
        >
          <ListItemButton
            alignItems="flex-start"
            onClick={() => setOpen(!open)}
            sx={{
              px: 3,
              pt: 1.5,
              pb: open ? 0 : 2.5,
              '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
            }}
          >
            <ListItemText
              primary={auth.user?.username}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: 'medium',
                lineHeight: '20px',
                mb: '2px',
              }}
              sx={{
                my: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            />
            <KeyboardArrowDown
              sx={{
                mr: -1,
                opacity: 0,
                transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                transition: '0.2s',
              }}
            />
          </ListItemButton>
          {open
                && data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 0, minHeight: 32, color: '#000' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                ))}
        </Box>

      </header>
      {
        auth.user && (
        <Following
          open={blockOpen}
          handleClose={handleCloseBlock}
          title="Blocked"
          button="unblock"
          url={`/users/${auth.user?.id}/blocked`}
          setOpen={setBlockOpen}
          action={modalBlock}
        />
        )
      }

    </>

  )
}

export default Navbar
