import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

const CapturePage:FC = () => {
  const navigate = useNavigate()
  return (
    <div className="landing-container">
      <div className="content">
        <Typography variant="h1">Share your events now!!</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit,
          amet consectetur adipisicing elit.
          Illo similique repellat natus cumque soluta debitis accusamus molestias seqa.

        </Typography>
        <Button
          onClick={() => navigate('/home')}
          sx={{
            zIndex: '10000',
            color: 'white',
            border: '1px solid #eee',
            width: 'max-content',
            display: 'block',
            margin: '0 auto',
            textTransform: 'capitalize',
            fontSize: '1.2rem',
            padding: '0.3rem 1rem',
            background: '#5050505e',
          }}
        >
          Get started

        </Button>
      </div>

    </div>
  )
}

export default CapturePage
