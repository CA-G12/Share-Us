
import { describe, expect, test } from '@jest/globals'
import app, { cronJobs } from '../src/app'
import supertest from 'supertest'
import build from '../src/db/build'
import sequelize from '../src/db/connection'
import { Message } from '../src/config/messages'
import config from '../src/config/environment'

const token = config.token

beforeAll(() => build())

describe('delete a comment', () => {
  test('Insert comment to test delete', done => {
    supertest(app)
      .post('/api/v1/events/1/comments')
      .send({
        content: 'lorem'
      })
      .set({ Authorization: token })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe('Comment add successfully')
        return done()
      })
  })

  test('deleted successfully', done => {
    supertest(app)
      .delete('/api/v1/events/1/comments/1')
      .set({ authorization: token })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.status).toBe('deleted')
          return done()
        }
      })
  })

  test('unauthorized ', done => {
    supertest(app)
      .delete('/api/v1/events/1/comments/1')
      .set({ authorization: 'test' })
      .expect(401)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toBe('unauthorized')
          return done()
        }
      })
  })

  test('params validation error ', done => {
    supertest(app)
      .delete('/api/v1/events/hhh/comments/1')
      .set({ authorization: token })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toBe(Message.VALIDATION_ERROR)
          return done()
        }
      })
  })
})

afterAll(async () => {
  cronJobs.forEach((job) => {
    job.stop()
  })
  return await sequelize.close()
})
