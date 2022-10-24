import { describe, expect, test } from '@jest/globals'

import supertest from 'supertest'
import app from '../src/app'
import build from '../src/db/build'
import { sequelize } from '../src/db'
import { Message } from '../src/config/messages'

beforeAll(() => build())
afterAll(() => sequelize.close())

describe('Event Joined routes', () => {
  test('get all Joined people', done => {
    supertest(app)
      .get('/api/v1/events/1/joined')
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
      .expect(200)
      .send({ UserId: 1 })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe(Message.JOINED)
        return done()
      })
  })
})
