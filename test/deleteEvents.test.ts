import { describe, expect, test } from '@jest/globals'

import supertest from 'supertest'
import app, { cronJobs } from '../src/app'
import { Message } from '../src/config/messages'
import build from '../src/db/build'
import { sequelize } from '../src/db'
import config from '../src/config/environment'

beforeAll(() => build())
afterAll(async () => {
  cronJobs.forEach((job) => {
    job.stop()
  })
  return await sequelize.close()
})

const token = config.token

describe('deleting event', () => {
  test('deleted successfully', done => {
    supertest(app)
      .delete('/api/v1/events/1')
      .set({ authorization: token })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.status).toBe('deleted')
          return done()
        }
      })
  })

  test('unauthorized ', done => {
    supertest(app)
      .delete('/api/v1/events/1')
      .set({ authorization: 'test' })
      .expect(401)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toBe('unauthorized')
          return done()
        }
      })
  })

  test('params validation error ', done => {
    supertest(app)
      .delete('/api/v1/events/hhh')
      .set({ authorization: token })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toBe(Message.VALIDATION_ERROR)
          return done()
        }
      })
  })
})
