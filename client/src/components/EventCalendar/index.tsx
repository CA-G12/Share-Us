import { FC, useState, useEffect } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './style.css'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../services/ApiService'

const EventCalendar:FC = () => {
  const [initialEvents, setInitialEvents] = useState([])
  const [interestedEvents, setInterestedEvents] = useState([])
  const navigate = useNavigate()
  const handleEventClick = (clickInfo:any):void => {
    const eventId = clickInfo?.event?.extendedProps.eventId

    if (window.confirm(`Are you sure you want to go to the event '${clickInfo.event.title}'`)) {
      navigate(`/event/${eventId}`)
    }
  }

  const renderEventContent = (eventInfo:any):any => {
    const status = eventInfo?.event.extendedProps.status
    const type = eventInfo?.event.extendedProps.type
    return (
      <div style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 'auto',
      }}
      >
        <h3 style={{ textTransform: 'capitalize', fontSize: '0.8rem' }}>{type}</h3>
        <p className="calendar-event-info">{eventInfo.timeText}</p>
        <p
          className="calendar-event-info"
          style={{ fontSize: '1rem', fontWeight: 500 }}
        >
          {eventInfo.event.title}

        </p>
        <p className={`event-status ${status}`}>{status}</p>
      </div>
    )
  }

  const renderSidebarEvent = (event:any):any => (
    <li
      key={event.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '3px',
        listStyle: 'circle',
      }}
    >
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>

      <b>{event.title}</b>

      <span className={`event-status ${event.status}`}>{event.status}</span>

    </li>
  )
  useEffect(() => {
    const allJoined = async ():Promise<void> => {
      try {
        const joined = await ApiService.get('/events/joined')
        const init = joined.data.data.map((ele:any) => ({
          id: ele.id,
          title: ele.Event.name,
          start: ele.Event.startTime,
          status: ele.Event.status,
          eventId: ele.EventId,
          type: 'joined',
        }))

        setInitialEvents(init)
      } catch (err) {
        setInitialEvents([])
      }
    }
    allJoined()

    const allInterested = async ():Promise<void> => {
      try {
        const interested = await ApiService.get('/events/interested')
        const init = interested.data.data.map((ele:any) => ({
          id: ele.id,
          title: ele.Event.name,
          start: ele.Event.startTime,
          status: ele.Event.status,
          eventId: ele.EventId,
          type: 'interested',
        }))
        setInterestedEvents(init)
      } catch (err) {
        setInterestedEvents([])
      }
    }
    allInterested()
  }, [])

  return (
    <div className="demo-app">
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>
            All Joined Events (
            {initialEvents.length}
            )
          </h2>
          <ul>
            {initialEvents.map(renderSidebarEvent)}
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>
            All Interested Events (
            {interestedEvents.length}
            )
          </h2>
          <ul>
            {interestedEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          selectable
          selectMirror
          dayMaxEvents
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          events={initialEvents.concat(interestedEvents)}
        />
      </div>
    </div>

  )
}

export default EventCalendar
