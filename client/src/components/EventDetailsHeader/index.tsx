/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import './style.css'

import React, { FC, SyntheticEvent } from 'react'
import {
  Button, Tabs, Tab, Box, Typography,
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import headerImage from '../../assets/images/headerImage.png'
import CommentsContainer from '../CommentsContainer'
import AboutEvent from '../AboutEvent'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const {
    children, value, index, ...other
  } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
const EventDetailsHeader:FC = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number):void => {
    setValue(newValue)
  }

  return (
    <div className="event-details-header">
      <div className="image-container">
        <img className="event-cover-img" src={headerImage} alt="headerImage" />
      </div>
      <div className="event-info-container">
        <p className="event-date">Date: friday  7 October 2022  from 7 PM to 11 Pm</p>
        <p className="event-duration">Duration: 4 hr</p>
        <p className="event-location">Location: London</p>
        <p className="event-organizer">by: shams</p>
        <h2 className="event-name">Halloween Party</h2>
      </div>
      <div className="event-btns-container">
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
        </Tabs>
        <div className="btn-container">
          <Button
            variant="contained"
            sx={{ backgroundColor: 'rgba(111, 255, 116, 0.370)' }}
          >
            <CheckCircleOutlinedIcon className="test" />
            Join
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'rgba(111, 186, 255, 0.370)' }}
          >
            <StarBorderIcon className="star-icon" />
            Interest
          </Button>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <AboutEvent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CommentsContainer />
      </TabPanel>
    </div>
  )
}

export default EventDetailsHeader
