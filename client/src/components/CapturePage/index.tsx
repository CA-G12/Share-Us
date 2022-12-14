import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

const CapturePage:FC = () => {
  const navigate = useNavigate()
  return (
    <div className="landing-container">
      <div className="content">
        <Typography variant="h1">
          Do what you love, join others who love it, find your community.
          The rest is history!

        </Typography>
        <Typography variant="body1">
          Whatever you’re looking to do this week, month, or year, Shareus can help.
          Events are happening on just about any topic
          you can think of, from online gaming
          and photography to yoga and hiking. Explore the shared interests and join the fun!

        </Typography>
        <Button
          onClick={() => navigate('/home')}
          sx={{
            zIndex: '10000',
            color: '#eee',
            textTransform: 'none',
            width: 'max-content',
            fontSize: '1rem',
            padding: '0.5rem 1.5rem',
            alignSelf: 'center',
            background: '#2A2A2A',
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%),',
            ' &:hover': {
              background: '#353535',
            },
          }}
        >
          Get started

        </Button>
      </div>
    </div>
  )
}

export default CapturePage
