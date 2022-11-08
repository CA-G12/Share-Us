import { Typography } from '@mui/material'
import { FC } from 'react'

const NoData:FC<any> = ({ error }) => (
  <div
    className="noData"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: 'auto',
    }}
  >
    <img
      src="https://tinyurl.com/yknbeeaj"
      alt="no data found"
      style={{ width: '150px', padding: '10px 0' }}
    />
    <Typography sx={{ fontSize: '1.2rem', color: '#2A2A2A' }}>{error}</Typography>
  </div>
)

export default NoData
