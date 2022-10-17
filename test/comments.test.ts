import { describe, expect, test } from '@jest/globals'
import app from '../src/app'
import supertest from 'supertest'
import build from '../src/db/build'
import sequelize from '../src/db/connection'
import { Message } from '../src/config/messages'

beforeAll(() => build())

describe('Post a comment', () => {
  const token = 'barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
  '.eyJ1c2VybmFtZSI6InNlZWYiLCJpZCI6IjEiLCJp' +
  'YXQiOjE2NjU5ODQzNTV9.xVpDCu-UcFQZsz6NzIGOnv6XdaOUcD04xbfWSlM1FoM'
  test('Insert comment 2 with image', done => {
    supertest(app)
      .post('/api/v1/events/4/comments')
      .send({
        image: 'https://png.pngtree.com/png-clipart' +
        '/20190515/original/pngtree-bule-border-png-image_3551748.jpg',
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

  test('Insert comment 2 without image', done => {
    supertest(app)
      .post('/api/v1/events/4/comments')
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

  test('Insert comment 3 without content', done => {
    supertest(app)
      .post('/api/v1/events/4/comments')
      .set({ Authorization: token })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
  test('Insert comment 4 without token', done => {
    supertest(app)
      .post('/api/v1/events/4/comments')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toBe('unauthorized')
        return done()
      })
  })
})

describe('Get all comments', () => {
  test('Get all comments', done => {
    supertest(app)
      .get('/api/v1/events/4/comments')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe('Comments received successfully')
        return done()
      })
  })
})

afterAll(() => sequelize.close())
