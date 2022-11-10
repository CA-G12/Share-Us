import { Response } from 'express'
import { google } from 'googleapis'
import { User } from '../db'
import { IUserRequest } from '../interfaces/IUserRequest'
import config from '../config/environment'
const Credentials = async (req:IUserRequest, res:Response):Promise<void> => {
  const oauth2Client = new google.auth.OAuth2(
    config.GOOGLE_CALENDAR_CLIENT_ID,
    config.GOOGLE_CALENDAR_CLIENT_SECRET
  )
  const user = req.user
  const accessToken = await User.findOne({
    where: {
      id: user?.id
    },
    attributes: ['oauthAccessToken']
  })
  // access_token , refresh_token , expiry_date
  oauth2Client.setCredentials({
    access_token: accessToken?.oauthAccessToken
  })
  const calendar = google.calendar({ version: 'v3' })

  calendar.events.insert({
    auth: oauth2Client,
    calendarId: 'primary',
    requestBody: {
      summary: req.body.summary,
      description: req.body.description,
      start: {
        dateTime: req.body.startTime,
        timeZone: 'Asia/Jerusalem'
      },
      end: {
        dateTime: req.body.endTime,
        timeZone: 'Asia/Jerusalem'
      }
    }
  }, function (err:any, event:any) {
    if (err) {
      console.error('Something went wrong' + err)
    }
    console.log('Event Added')
    res.json({ msg: 'add successflly!' })
  })
}

export default Credentials
