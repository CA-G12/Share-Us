import { Grid } from '@mui/material'
import { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { IEventDetails } from '../../interfaces'
import { CardContainerProps } from '../../interfaces/props/EventCardProps'
import NoData from '../NoData'
import EventCard from './EventCard'
import './style.css'

const EventCardContainer:FC<CardContainerProps> = ({ allEvents, followerId }) => {
  const auth = useAuth()
  const isInFollowing = (id:number):boolean => auth.user?.following?.includes(id)
  const isMe = (id:number):boolean => auth.user?.id === id
  const isUserProfile = (id:number):boolean => id === followerId
  const filteredEvents = (events:IEventDetails[]):IEventDetails[] => events
    .filter((evt) => isInFollowing(evt?.User?.id)
    || isMe(evt?.User?.id)
    || isUserProfile(evt?.User?.id))

  return (
    <div className="card-container">
      <Grid container spacing={2}>
        {
        auth.user
        && (!filteredEvents(allEvents).length
          ? (
            <Grid item xs={12}>
              <NoData error="No events found" />
            </Grid>
          )
          : filteredEvents(allEvents)
            .map((evt:any) => (
              <Grid item xs={3} key={evt.id}>
                <EventCard event={evt} />
              </Grid>
            )))
      }
        {
        !auth.user
        && (!allEvents.length
          ? (
            <NoData error="No events found" />
          )
          : allEvents
            .map((evt:any) => (
              <Grid item xs={3}>
                <EventCard event={evt} key={evt.id} />
              </Grid>
            )))
      }
      </Grid>
    </div>

  )
}

export default EventCardContainer
