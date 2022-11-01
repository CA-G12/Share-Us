import { FC, useState } from 'react'
import dayjs from 'dayjs'
import {
  ListItemText, Box, Modal, Avatar, Typography, ListItemAvatar, Divider,
  ListItem, List, Badge,
} from '@mui/material'
import { formatDistance, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import ApiService from '../../services/ApiService'
import './style.css'

const NotificationsList:FC<any> = ({
  realTimeNotifications, openNotifications, handleClose, setNotificationCount,
}) => {
  const oldNotifications = useAuth().user?.notifications
  const auth = useAuth()
  const navigate = useNavigate()
  const style = {
    position: 'absolute' as 'absolute',
    top: '46%',
    left: '65%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  }
  const [test, setTest] = useState('')
  const readNotification = async (id:number):Promise<void> => {
    if (auth.user) {
      const updateState = await ApiService.patch(`/users/${auth.id}`, { id })
      const newOne = oldNotifications.map((ele:any) => {
        if (ele.id === +id) {
          return { ...ele, status: updateState.data.status }
        }
        return ele
      })
      auth.setUser({ ...auth.user, notifications: newOne })
      setTest(updateState.data.status)
    } else {
      navigate('/login')
    }
  }

  return (
    <div>
      <Modal
        open={openNotifications}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="notifications-modal">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontWeight: '600',
              fontSize: '1.4rem',
              lineHeight: '49px',
              color: ' #2A2A2A',
              textAlign: 'center',
            }}
          >
            Notifications
          </Typography>
          <hr />
          {' '}
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {realTimeNotifications.map((ele:any) => (
              <>
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
                      color="secondary"
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

              </>
            ))}
            {
            oldNotifications?.length
            && oldNotifications
              .sort((b:any, a:any) => dayjs(a.createdAt).diff(b.createdAt))
              .map((ele:any) => (
                <>
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
                      setTest('read')
                      if (ele.status === 'unread') { setNotificationCount((prev:any) => prev - 1) }
                    }}
                  >
                    {ele.status === 'unread'
                    && (
                      <p className="notification-state">
                        <Badge
                          color="secondary"
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
                        <>
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
                        </>
          )}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />

                </>
              ))
}
          </List>
        </Box>
      </Modal>
    </div>
  )
}

export default NotificationsList
