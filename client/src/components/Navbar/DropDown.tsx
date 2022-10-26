/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Avatar } from '@mui/material'
import Divider from '@mui/material/Divider'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useNavigate } from 'react-router-dom'
import Following from '../following'
import { useAuth } from '../../hooks/useAuth'
import ApiService from '../../services/ApiService'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px`,
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}))
// interface IDropDown {
//   username?:string
// }
const CustomizedMenus:FC = ():JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick:any = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = ():void => {
    setAnchorEl(null)
  }

  const [blockOpen, setBlockOpen] = useState<boolean>(false)

  const handleOpenBlock = ():void => setBlockOpen(true)

  const handleCloseBlock = ():void => setBlockOpen(false)

  const auth = useAuth()
  const navigate = useNavigate()

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
              width: '50px', height: '50px', borderRadius: '50%', position: 'absolute',
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

          <MenuItem
            onClick={
              handleOpenBlock
            }
            disableRipple
          >
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
      <Following
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
