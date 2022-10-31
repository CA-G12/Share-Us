interface ICalculateDurations {
  days:number,
  hours:number,
  minutes:number,
  seconds:number,
}
const calculateDuration = (v1:string, v2:string):ICalculateDurations => {
  const startTime = new Date(v1)
  const endTime = new Date(v2)
  // '2022-10-21T03:01:00.411Z', '2022-10-19T03:00:44.411Z'
  const pastDates = startTime.getTime()
  const futureDate = endTime.getTime()
  let seconds:any = Math.floor((futureDate - (pastDates)) / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  hours -= (days * 24)
  minutes = minutes - (days * 24 * 60) - (hours * 60)
  seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)

  return {
    days, hours, minutes, seconds,
  }
}

export default calculateDuration
