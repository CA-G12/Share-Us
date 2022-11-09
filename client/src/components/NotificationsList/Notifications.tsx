/* eslint-disable react/jsx-props-no-spreading */
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import { FC } from 'react'
import dayjs from 'dayjs'
import {
  ListItemText, Avatar, Typography, ListItemAvatar, Divider,
  ListItem, Badge,
} from '@mui/material'
import { formatDistance, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '../../hooks/useAuth'
import INotificationsList from '../../interfaces/props/INotificationsList'
import ApiService from '../../services/ApiService'

import './style.css'

const StyledMenu:any = styled((props: MenuProps):any => (
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
    width: 400,
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

const NotificationsList:FC<INotificationsList> = ({
  anchorEl, handleClose, open, realTimeNotifications, setNotificationCount,
}) => {
  const oldNotifications = useAuth().user?.notifications
  const auth = useAuth()
  const navigate = useNavigate()
  const readNotification = async (id:number):Promise<void> => {
    if (auth.user) {
      const updateState = await
      ApiService.patch(`/api/v1/users/${auth.id}/notifications`, { id })
      const newOne = oldNotifications.map((ele:any) => {
        if (ele.id === +id) {
          return { ...ele, status: updateState.data.status }
        }
        return ele
      })
      auth.setUser({ ...auth.user, notifications: newOne })
    } else {
      navigate('/login')
    }
  }
  return (
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      className="menu-container"
    >
      {realTimeNotifications.map((ele:any) => (
        <div key={uuidv4()}>
          <ListItem
            alignItems="flex-start"
            style={{
              margin: '5px auto',
              padding: '0 1rem',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate(`/users/${ele?.senderInfo.id}`)
              handleClose()
            }}
          >
            <p
              className="notification-state"
            >
              <Badge
                color="primary"
                badgeContent=" "
                variant="dot"
              />
            </p>

            <ListItemAvatar>
              <Avatar
                alt={ele?.senderInfo.username}
                src={ele?.senderInfo.profileImg}
              />
            </ListItemAvatar>
            <ListItemText
              primary={ele?.message}
              secondary={(
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {ele?.createdAt}
                  </Typography>
                  {' — View Profile…'}
                </>
          )}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}

      {oldNotifications
            && oldNotifications
              .sort((b:any, a:any) => dayjs(a.createdAt).diff(b.createdAt))
              .map((ele:any) => (
                <div key={ele.id}>
                  <ListItem
                    alignItems="flex-start"
                    style={{
                      margin: '5px auto',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      readNotification(ele?.id)
                      navigate(`/users/${ele?.senderInfo?.id}`)
                      handleClose()
                      if (ele.status === 'unread') {
                        setNotificationCount((prev:any) => prev - 1)
                      }
                    }}
                  >
                    {ele.status === 'unread'
                    && (
                      <p className="notification-state">
                        <Badge
                          color="primary"
                          badgeContent=" "
                          variant="dot"
                        />
                      </p>
                    )}

                    <ListItemAvatar>
                      <Avatar
                        alt={ele?.senderInfo?.username}
                        src={ele?.senderInfo?.profileImg}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={ele?.message}
                      secondary={(
                        <div>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            { formatDistance(
                              parseISO(ele?.createdAt),
                              new Date(),
                              { addSuffix: true },
                            )}
                          </Typography>
                          {' — View Profile…'}
                        </div>
          )}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              ))}
      { (!oldNotifications?.length && !realTimeNotifications?.length)
       && <p className="no-notification">No notification</p>}

    </StyledMenu>
  )
}

export default NotificationsList
