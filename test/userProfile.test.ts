import { describe, expect, test } from '@jest/globals'
import app from '../src/app'
import supertest from 'supertest'
import build from '../src/db/build'
import { sequelize } from '../src/db'

beforeAll(() => build())
afterAll(() => sequelize.close())

describe('Testing user profile routes', () => {
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
