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
      <p
        className="calendar-event-info"
        style={{ fontSize: '1.1rem', fontWeight: 600, color: '#000' }}
      >
        {eventInfo.event.title}
      </p>
      <p className="calendar-event-info" style={{ color: '#333' }}>{eventInfo.timeText}</p>
      <h3 style={{ textTransform: 'capitalize', fontSize: '0.75rem' }}>{type}</h3>
      <p className={`event-status ${status}`} style={{ margin: 'auto' }}>
        {status}
      </p>
    </div>
  )
}

export default renderEventContent
