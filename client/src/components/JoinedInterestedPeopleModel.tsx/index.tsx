import { FC } from 'react'
import {
  Button, Typography, Box,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import './style.css'
import { useNavigate } from 'react-router-dom'
import IModalProps from '../../interfaces/props/IModalProps'

const JoinedPeopleModel:FC<IModalProps> = ({
  title, handleClose, open, listPeople,
}) => {
  const navigate = useNavigate()
  return (
    <div className="following-popup">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="joined-container"
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4,
          }}
        >
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
            {title}
          </Typography>
          <hr />

          {!listPeople.length && <p className="no-users-msg">no users Found</p>}

          {
          listPeople.map((ele):any => (
            <div className="user">
              <Box className="username" onClick={() => navigate(`/users/${ele.User.id}`)}>
                <img
                  src={ele.User.profileImg}
                  alt=""
                />
                <Typography sx={{ fontWeight: 600 }}>{ele.User.username}</Typography>
              </Box>
              <Button className="follow-btn">
                Follow
              </Button>
            </div>
          ))
        }

        </Box>
      </Modal>
    </div>
  )
}

export default JoinedPeopleModel
