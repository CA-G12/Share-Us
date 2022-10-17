import { Dayjs } from 'dayjs'

export default interface EventFilterProp {
  setCurrentStatus: Function
  setStartTime: Function
  setEndTime: Function
  startTime: Dayjs
  endTime: Dayjs
  currentStatus: string
}
