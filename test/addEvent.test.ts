import { describe, expect, test } from '@jest/globals'

import supertest from 'supertest'
import app from '../src/app'
import { Message } from '../src/config/messages'
import build  from '../src/db/build'
import { sequelize } from '../src/db'

beforeAll(() => build())
afterAll(() => sequelize.close())

describe('Adding event', () => {
  test('Insert data', done => {
    supertest(app)
      .post('/api/v1/events')
      .send({
        name: 'Halloween party',
        description: 'you should wear a custom',
        img:
          'https://www.history.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTU4MDgyMjQyMTM5MTM3ODE3/halloween.jpg',
        status: 'upcoming',
        startTime: '2022-12-24 08:59:37.398 +00:00',
        endTime: '2022-12-30 08:59:37.398 +00:00',
        longitude: '35.233154',
        latitude: '31.952162'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe(Message.SUCCESS)
        return done()
      })
  })
  test('Image field empty', done => {
    supertest(app)
      .post('/api/v1/events')
      .send({
        name: 'Halloween party',
        description: 'you should wear a custom',
        status: 'upcoming',
        startTime: '2022-12-24 08:59:37.398 +00:00',
        endTime: '2022-12-30 08:59:37.398 +00:00',
        longitude: '35.233154',
        latitude: '31.952162'
      })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe(Message.VALIDATION_ERROR)
        return done()
      })
  })
})
