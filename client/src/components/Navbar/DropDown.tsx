import React, { FC, useState } from 'react'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Avatar } from '@mui/material'
import Divider from '@mui/material/Divider'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useNavigate } from 'react-router-dom'
import UserAudience from '../UserAudience'
import { useAuth } from '../../hooks/useAuth'
import { StyledMenu } from './styledMenu'
import { useFollowing } from '../../hooks/useFollowing'

const CustomizedMenus: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [blockOpen, setBlockOpen] = useState<boolean>(false)
  const auth = useAuth()
  const followingHook = useFollowing()
  const navigate = useNavigate()
  const open = Boolean(anchorEl)
  const handleClick: any = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleOpenBlock = (): void => setBlockOpen(true)
  const handleCloseBlock = (): void => setBlockOpen(false)

  const modalBlock = async (id: number): Promise<void> => {
    const isDone = await followingHook.blockUser(id)
    if (!isDone) {
      navigate('/login')
    }
  }

  return (
    <>
      {' '}
      <div>
        <Button
          id="demo-customized-button"
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            position: 'relative',
          }}
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          disableElevation
          disableRipple
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Avatar
            src={auth.user?.profileImg}
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              position: 'absolute',
            }}
          >
            H
            {' '}
          </Avatar>
        </Button>

        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              navigate(`/users/${auth.user?.id}`)
              handleClose()
            }}
            disableRipple
          >
            <AccountCircleOutlinedIcon />
            {auth.user?.username}
          </MenuItem>

          <MenuItem onClick={handleOpenBlock} disableRipple>
            <PersonRemoveAlt1OutlinedIcon />
            Blocked Users
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem
            onClick={() => {
              auth.signOut()
              navigate('/')
            }}
            disableRipple
          >
            <LogoutIcon />
            Logout
          </MenuItem>
        </StyledMenu>
      </div>

      {auth.user && (
        <UserAudience
          open={blockOpen}
          handleClose={handleCloseBlock}
          title="Blocked"
          url={`/users/${auth.user?.id}/blocked`}
          setOpen={setBlockOpen}
          action={modalBlock}
          button="Unblock"
        />
      )}
    </>
  )
}

export default CustomizedMenus
