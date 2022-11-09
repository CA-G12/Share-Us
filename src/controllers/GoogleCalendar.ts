
import { Response } from 'express'
import { google } from 'googleapis'
import { User } from '../db'
import { IUserRequest } from '../interfaces/IUserRequest'

const Credentials = async (req:IUserRequest, res:Response):Promise<void> => {
  const oauth2Client = new google.auth.OAuth2(
    '557335500321-67c4uk73m6ukkg4dbbptq0p5q0sdlgbp.apps.googleusercontent.com',
    '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'
  )
  const user = req.user
  const accessToken = await User.findOne({
    where: {
      id: user?.id
    },
    attributes: ['oauthAccessToken']
  })
  console.log('accessToken:', accessToken?.oauthAccessToken)
  oauth2Client.setCredentials({
    access_token:
    // accessToken
    // eslint-disable-next-line max-len
    'ya29.a0AeTM1id7cQrshXcqcX1Op5gCDYXJy03TX5lv6y_1VIW_Qq3d2skjbU0MGClC13kFSX3ur5eGtxXW5ssslnDk07Xw2zDCDXxiEGcqE-vggHKfG0ULbQuFtfrAMHNWF4rb4v1hf5n7I7Jr-_ZNCWv3J2_mfbd01waCgYKAUQSARMSFQHWtWOm4fVEJHV9stpvhsWjpbQ0xg0165'

  })
  // oauth2Client.refreshAccessToken()

  const calendar = google.calendar({ version: 'v3' })

  const event = {
    summary: 'Test event',
    description: 'Google add event testing.',
    start: {
      dateTime: '2022-11-07T01:00:00-07:00',
      timeZone: 'Asia/Jerusalem'
    },
    end: {
      dateTime: '2022-11-07T05:00:00-07:00',
      timeZone: 'Asia/Jerusalem'
    }
  }

  // We make a request to Google Calendar API.
  calendar.events.insert({
    auth: oauth2Client,
    calendarId: 'primary',
    requestBody: {
      summary: 'Test event',
      description: 'Google add event testing.',
      start: {
        dateTime: '2022-11-09T01:00:00-07:00',
        timeZone: 'Asia/Jerusalem'
      },
      end: {
        dateTime: '2022-11-09T05:00:00-07:00',
        timeZone: 'Asia/Jerusalem'
      }
    }
  }, function (err:any, event:any) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err)
    }
    console.log('Event created: %s', event)
    res.json({ msg: 'add successflly!' })
  })
}
export default Credentials
