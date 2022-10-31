import corn from 'node-cron'
import sendEmail from '../helpers/sendingEmail'
import dayjs from 'dayjs'
import { Event, JoinedPeople, User } from '../models'

import { Op } from 'sequelize'

const reminderEmail = () => {
  corn.schedule('*/5 * * * *', async () => {
    const now = dayjs().toISOString()
    const afterOneHour = dayjs().add(1, 'hour').toISOString()

    const eventToStart = await Event.findAll({
      include: {
        model: JoinedPeople,
        attributes: ['isEmailSent', 'id'],
        include: [{ model: User, attributes: ['email', 'username'] }]
      },
      where: {
        startTime: {
          [Op.between]: [now, afterOneHour]
        }
      }
    })

    const update = async (id:any) => {
      await JoinedPeople.update({
        isEmailSent: true
      },
      {
        where: {
          id
        }
      })
    }

    eventToStart.forEach((e: any) => {
      e.dataValues.JoinedPeople.forEach((ele: any) => {
        if (ele && ele.isEmailSent === false) {
          sendEmail(
            ele.User.email,
            "Don't miss your events!!",
            `Hi, Thanks for joining us ${ele.User.username}!!
            
            The event/s you joined "${e.dataValues.name}" will start in an hour, we would love to seeing you in the event place and hope you enjoy it as much as you can! Don't forget to
            tell us what you think about it in the event comments!
            
            Have fun!`
          )
          update(ele.id)
        }
      })
    })
  })
}

export default reminderEmail
