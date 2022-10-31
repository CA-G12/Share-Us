import { describe, expect, test } from '@jest/globals'
import app, { cronJobs } from '../src/app'
import supertest from 'supertest'
import build from '../src/db/build'
import { sequelize } from '../src/db'

beforeAll(() => build())
afterAll(async () => {
  cronJobs.forEach((job) => {
    job.stop()
  })
  return await sequelize.close()
})

describe('events details', () => {
  test('Data received successfully ', (done) => {
    supertest(app)
      .get('/api/v1/events/5')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.id).toEqual(5)
        return done()
      })
  })
  test('Event Not Found', (done) => {
    supertest(app)
      .get('/api/v1/events/6')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect('Event Not Found').toEqual('Event Not Found'
        )
        return done()
      })
  })
})
