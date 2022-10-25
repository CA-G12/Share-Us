import { describe, expect, test } from '@jest/globals'

import supertest from 'supertest'
import app from '../src/app'
import build from '../src/db/build'
import { sequelize } from '../src/db'
import { Message } from '../src/config/messages'

beforeAll(() => build())
afterAll(() => sequelize.close())

describe('Event interested routes', () => {
  test('get all interested people', done => {
    supertest(app)
      .get('/api/v1/events/1/interested')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)
        expect(res.body.message).toBe(Message.SUCCESS)
        return done()
      })
  })
  test('Show interest in an event', done => {
    supertest(app)
      .post('/api/v1/events/2/interested')
      .expect(200)
      .send({ UserId: 1 })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe(Message.INTERESTED)
        return done()
      })
  })
})
