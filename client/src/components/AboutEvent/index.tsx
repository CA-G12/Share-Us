import './style.css'
import { FC } from 'react'
import { Paper } from '@mui/material'
import mapImg from '../../assets/images/map.png'

const AboutEvent:FC = () => (
  <div className="about-event">
    <div className="description-container">
      <h3>description</h3>
      <p>
        It’s almost time to trade in your COVID-safe mask for one that’s,
        well, a little more fun.  From the costumes to the candy, Halloween
        is a low-stress holiday event that allows team members to interact
        in a laid-back setting as well as showcase their creativity.
      </p>
      <div className="hashtag-container">
        <Paper
          elevation={1}
          variant="outlined"
          className="hashtag-label"
        >
          #hashtag
        </Paper>
        <Paper
          elevation={1}
          variant="outlined"
          className="hashtag-label"
        >
          #hashtag2
        </Paper>

      </div>
    </div>

    <div className="participants-map">
      <div className="participants-container">
        <h3>Participants</h3>
        <div>
          <p>
            <span>150</span>
            interested
          </p>
          <p>
            <span>42</span>
            Joined
          </p>
        </div>
      </div>
      <div className="map-container">
        <img className="map" src={mapImg} alt="map" />
        <p>Location: London</p>
      </div>
    </div>
  </div>
)

export default AboutEvent
