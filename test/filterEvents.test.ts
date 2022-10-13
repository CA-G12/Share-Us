import { describe, expect, test } from '@jest/globals'
import app from '../src/app'
import supertest from 'supertest'
import build from '../src/db/build'
import sequelize from '../src/db/connection'

beforeEach(() => build())

describe('Filter events tests', () => {
  test('length of all products', (done) => {
    supertest(app)
      .get('/api/v1/events')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.length).toEqual(5)
        return done()
      })
  })

  test('get all events filtered by status:closed', (done) => {
    supertest(app)
      .get('/api/v1/events/?status=closed')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)

        expect(res.body[0].description).toEqual(
          'you should wear a custom'
        )
        return done()
      })
  })

  test('get all products filtered by data', (done) => {
    supertest(app)
      .get('/api/v1/events/?from=2022-1-20&to=2022-1-28')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)

        expect(res.body[0].name).toEqual(
          'Hiking'
        )
        return done()
      })
  })
})

afterAll(() => sequelize.close)
