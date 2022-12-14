import cron from 'node-cron'
import { Event } from '../db'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Op } from 'sequelize'
dayjs.extend(isBetween)

const changeStatus = () => {
  return cron.schedule('*/5 * * * *', async () => {
    // running a task every 5 minutes

    const events = await Event.findAll({ where: { status: { [Op.not]: 'closed' } } })
    events.forEach((evt) => {
      const startTime = evt?.startTime
      const endTime = evt?.endTime

      if (dayjs().isBetween(startTime, endTime)) {
        Event.update({ status: 'in-progress' }, { where: { id: evt.id } })
      } else if (dayjs().isBefore(startTime)) {
        Event.update({ status: 'upcoming' }, { where: { id: evt.id } })
      } else if (dayjs().isAfter(endTime)) {
        Event.update({ status: 'closed' }, { where: { id: evt.id } })
      }
    })
  })
}

export default changeStatus
