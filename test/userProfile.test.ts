import { describe, expect, test } from '@jest/globals'
import app, { cronJobs } from '../src/app'
import supertest from 'supertest'
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

describe('Testing user profile routes', () => {
  const token = config.token

  test('user not found', (done) => {
    supertest(app)
      .get('/api/v1/users/6')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toEqual('Not Found')
        return done()
      })
  })
  test('Data received successfully message', (done) => {
    supertest(app)
      .get('/api/v1/users/2')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toEqual('Data received successfully')
        return done()
      })
  })

  test('update data', (done) => {
    supertest(app)
      .put('/api/v1/users/2')
      .set({ authorization: token })
      .expect('Content-Type', /json/)
      .send({
        data: {
          username: 'saif Hayekk'
        }

      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toEqual('Data updated successfully')
        expect(res.body.data[0].username).toEqual('saif Hayekk')
        return done()
      })
  })

  test('get events of a specific user', (done) => {
    supertest(app)
      .get('/api/v1/events/2')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toEqual('Data received successfully')
        return done()
      })
  })
})
