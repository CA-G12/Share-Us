import { FC } from 'react'
import {
  ListItemText, Box, Modal, Avatar, Typography, ListItemAvatar, Divider,
  ListItem, List,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './style.css'

const NotificationsList:FC<any> = ({ realTimeNotifications, openNotifications, handleClose }) => {
  const oldNotifications = useAuth().user.notifications
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
                  style={{ margin: '5px auto', padding: '0 1rem', cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/users/${ele?.senderId}`)
                    handleClose()
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={ele?.senderName}
                      src={ele?.profileImg}
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
                          {ele?.senderName}
                        </Typography>
                        {' — View Profile…'}
                      </>
          )}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />

              </>
            ))}
            {oldNotifications.reverse().map((ele:any) => (
              <>
                <ListItem
                  alignItems="flex-start"
                  style={{ margin: '5px auto', cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/users/${ele?.senderInfo.id}`)
                    handleClose()
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={ele?.senderInfo.username}
                      src={ele?.senderInfo.profileImg}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={ele.message}
                    secondary={(
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {ele.senderInfo.username}
                        </Typography>
                        {' — View Profile…'}
                      </>
          )}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />

              </>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  )
}

export default NotificationsList
