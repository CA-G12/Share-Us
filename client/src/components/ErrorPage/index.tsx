import { FC } from 'react'
import {
  Box, Button,
} from '@mui/material'
import {
  Link,
} from 'react-router-dom'
import './style.css'
import ImageNotFound from './notFound.png'

const NotFound:FC = () => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <Box>
      <img width="100%" height="500px" alt="not found" src={ImageNotFound} />
    </Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h4 className="footerContent">Page Not Found</h4>
      <p className="footerContent">We are sorry but the page you are looking for does not exist.</p>
      <Link
        to="/"
      >
        <Button
          sx={{
            '&:hover': {
              backgroundColor: '#2A2A2A',
            },
            fontSize: '0.9rem',
            backgroundColor: '#2A2A2A',
            boxShadow: ' 0px 1px 4px #2a2a2a',
            borderRadius: '8px',
            color: '#ececec',
            border: '0',
            textTransform: 'capitalize',
            padding: '0.4rem 0.8rem',
            cursor: 'pointer',
            height: '30px',
          }}
          variant="outlined"
        >
          Back to Home
        </Button>
      </Link>
    </Box>

  </Box>
)
export default NotFound
