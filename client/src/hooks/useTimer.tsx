import { useEffect, useState } from 'react'
import {
  intervalToDuration, isBefore, differenceInSeconds,
} from 'date-fns'

export const useTimer = (futureDate : Date) : any => {
  const oneDay = 60 * 60 * 24
  const oneHour = 60 * 60
  const oneMinute = 60

  const [now, setNow] = useState(new Date())

  const diffInSeconds = differenceInSeconds(futureDate, now)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [futureDate])

  const isTimeUp = isBefore(futureDate, now)

  if (isTimeUp) {
    return {
      days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp,
    }
  }

  const days = Math.floor(diffInSeconds / oneDay)
  const hours = Math.floor((diffInSeconds - days * oneDay) / oneHour)
  const minutes = Math.floor(
    (diffInSeconds - days * oneDay - hours * oneHour) / oneMinute,
  )
  const seconds = diffInSeconds - days * oneDay - hours * oneHour - minutes * oneMinute

  intervalToDuration({
    start: now,
    end: futureDate,
  })

  return {
    days, hours, minutes, seconds, isTimeUp,
  }
}
