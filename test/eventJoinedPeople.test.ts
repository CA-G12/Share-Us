import { describe, expect, test } from '@jest/globals'

import supertest from 'supertest'
import app, { cronJobs } from '../src/app'
import build from '../src/db/build'
import { sequelize } from '../src/db'
import { Message } from '../src/config/messages'
import config from '../src/config/environment'

beforeAll(() => build())
afterAll(async () => {
  cronJobs.forEach((job) => {
    job.stop()
  })
  return await sequelize.close()
})

const token = config.token
describe('Event Joined routes', () => {
  test('get all Joined people', done => {
    supertest(app)
      .get('/api/v1/events/joined')
      .set({ authorization: token })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe(Message.SUCCESS)
        return done()
      })
  })
  test('add join to an event', done => {
    supertest(app)
      .post('/api/v1/events/3/joined')
      .set({ authorization: token })
      .expect(200)
      .send({ UserId: 1 })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe(Message.JOINED)
        return done()
      })
  })
})
