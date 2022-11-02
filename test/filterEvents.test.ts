import { describe, expect, test } from '@jest/globals'
import app, { cronJobs } from '../src/app'
import supertest from 'supertest'
import build from '../src/db/build'
import sequelize from '../src/db/connection'

beforeAll(() => build())

describe('Filter events tests', () => {
  test('length of all events', (done) => {
    supertest(app)
      .get('/api/v1/events')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.length).toEqual(5)
        return done()
      })
  })

  test('test an event filtered by status:upcoming', (done) => {
    supertest(app)
      .get('/api/v1/events/?status=upcoming')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data[0].status).toEqual(
          'upcoming'
        )
        return done()
      })
  })

  test('get an event filtered by date', (done) => {
    supertest(app)
      .get('/api/v1/events/?from=2022-10-30&to=2022-11-1')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toEqual(
          'Data received successfully'
        )
        return done()
      })
  })
})

afterAll(async () => {
  cronJobs.forEach((job) => {
    job.stop()
  })
  return await sequelize.close()
})
