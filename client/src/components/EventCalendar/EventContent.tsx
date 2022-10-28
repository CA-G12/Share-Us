import { EventContentArg } from '@fullcalendar/react'
import { ReactElement } from 'react'

const renderEventContent = (eventInfo:EventContentArg):ReactElement => {
  const status = eventInfo?.event.extendedProps.status
  const type = eventInfo?.event.extendedProps.type
  return (
    <div style={{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: 'auto',
      cursor: 'pointer',
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

export default renderEventContent
