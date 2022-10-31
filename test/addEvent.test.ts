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

describe('Adding event', () => {
  test('Insert data', done => {
    supertest(app)
      .post('/api/v1/events')
      .set({ authorization: token })
      .send({
        name: 'Halloween party',
        description: 'you should wear a custom',
        img:
          'https://www.history.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTU4MDgyMjQyMTM5MTM3ODE3/halloween.jpg',
        status: 'upcoming',
        startTime: '2022-12-24 08:59:37.398 +00:00',
        endTime: '2022-12-30 08:59:37.398 +00:00',
        longitude: '35.233154',
        latitude: '31.952162',
        placeName: 'Gaza'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe(Message.ADDED)
        return done()
      })
  })
  test('Image field empty', done => {
    supertest(app)
      .post('/api/v1/events')
      .set({ authorization: token })
      .send({
        name: 'Halloween party',
        description: 'you should wear a custom',
        status: 'upcoming',
        startTime: '2022-12-24 08:59:37.398 +00:00',
        endTime: '2022-12-30 08:59:37.398 +00:00',
        longitude: '35.233154',
        latitude: '31.952162',
        placeName: 'Gaza'
      })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe(Message.VALIDATION_ERROR)
        return done()
      })
  })
})
