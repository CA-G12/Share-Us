import { Grid, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import { IEventDetails } from '../../interfaces'
import { CardContainerProps } from '../../interfaces/props/EventCardProps'
import NoData from '../NoData'
import EventCard from './EventCard'
import './style.css'
import ApiService from '../../services/ApiService'

const EventCardContainer:FC<CardContainerProps> = ({ allEvents, followerId }) => {
  const auth = useAuth()
  const isInFollowing = (id:number):boolean => auth.user?.following?.includes(id)
  const isMe = (id:number):boolean => auth.user?.id === id
  const isUserProfile = (id:number):boolean => id === followerId
  const isHome = auth.user && !followerId

  const filteredEvents = (events:IEventDetails[]):IEventDetails[] => events
    .filter((evt) => isInFollowing(evt?.User?.id)
    || isMe(evt?.User?.id)
    || isUserProfile(evt?.User?.id))

  const suggestedUsers = (events:IEventDetails[]):IEventDetails[] => events
    .filter((e) => !isInFollowing(e?.User.id) && !isMe(e?.User?.id) && !isUserProfile(e?.User.id))

  const [deletedId, setDeletedId] = useState<number[]>([])
  const handleDelete = async (id:number):Promise<void> => {
    const deletedEvent = await ApiService.delete(`/api/v1/events/${id}`)
    if (deletedEvent.data.status === 'deleted') {
      setDeletedId([...deletedId, id])
      toast(deletedEvent.data.message)
    }
  }

  return (
    <div className="card-container">
      {isHome && (
      <Typography sx={{
        fontWeight: 600,
        fontSize: '1.3rem',
        padding: '0 0 0.5rem 1.5rem',
      }}
      >
        Suggested Events
      </Typography>
      )}
      <Grid container spacing={2}>
        {auth.user && (suggestedUsers(allEvents).sort(() => 0.5 - Math.random())
          .slice(0, 4).map((evt:any) => (
            <Grid item xs={3} key={evt.id}>
              <EventCard event={evt} handleDelete={handleDelete} />
            </Grid>
          )))}
        {(isHome && !suggestedUsers(allEvents).length)
         && <Typography sx={{ padding: '0.8rem 0 0 2.5rem' }}>No suggested events</Typography>}
      </Grid>
      <br />
      {auth.user && (
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '1.3rem',
          padding: '0.5rem 0 0.5rem 1.5rem',
        }}
      >
        All Events
      </Typography>
      )}
      <Grid container spacing={2}>
        {
        auth.user
        && (!filteredEvents(allEvents).length
          ? (
            <Grid item xs={12}>
              <NoData error="No events found" />
            </Grid>
          )
          : filteredEvents(allEvents).filter((evt:any) => !deletedId.includes(evt.id))
            .map((evt:any) => (
              <Grid item xs={3} key={evt.id}>
                <EventCard event={evt} handleDelete={handleDelete} />
              </Grid>
            )))
      }
        {
        !auth.user
        && (!allEvents.length
          ? (
            <NoData error="No events found" />
          )
          : allEvents.filter((evt:any) => !deletedId.includes(evt.id))
            .map((evt:any) => (
              <Grid item xs={3}>
                <EventCard event={evt} key={evt.id} handleDelete={handleDelete} />
              </Grid>
            )))
      }
      </Grid>
    </div>

  )
}

export default EventCardContainer
