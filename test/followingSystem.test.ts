import { describe, expect, test } from '@jest/globals'
import supertest from 'supertest'
import { sequelize } from '../src/db'
import { build } from '../src/db/build'
import app from '../src/app'
import config from '../src/config/environment'

beforeAll(() => build())
afterAll(() => sequelize.close())

describe('Following system routers', () => {
  // token for user id = 1
  const token = config.token
  const token2 = config.token2

  test('check if the user can follow other user successfully', (done) => {
    supertest(app)
      .patch('/api/v1/users/following/2')
      .set({ authorization: token })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data[0].followers.length).toEqual(1)
          return done()
        }
      })
  })
  test('check if the user can response the following from other user', (done) => {
    supertest(app)
      .patch('/api/v1/users/following/1')
      .set({ authorization: token2 })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data[0].followers.length).toEqual(1)
          return done()
        }
      })
  })
  test('check if the user can un follow other user successfully', (done) => {
    supertest(app)
      .patch('/api/v1/users/following/2')
      .set({ authorization: token })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data[0].followers.length).toEqual(0)
          return done()
        }
      })
  })
  test('check if the user can remove following other user successfully', (done) => {
    supertest(app)
      .delete('/api/v1/users/removeFollower/2')
      .set({ authorization: token })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data[0].following.length).toEqual(0)
          return done()
        }
      })
  })
  test('check if the un followed user can follow the other user after un following', (done) => {
    supertest(app)
      .patch('/api/v1/users/following/2')
      .set({ authorization: token })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data[0].followers.length).toEqual(1)
          return done()
        }
      })
  })
  test('check if the followed user can block the other user after following', (done) => {
    supertest(app)
      .patch('/api/v1/users/blocked/1')
      .set({ authorization: token2 })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.authUser[0].blocked.length).toEqual(1)
          return done()
        }
      })
  })
  test('check if the blocked user can not follow the other user', (done) => {
    supertest(app)
      .patch('/api/v1/users/following/2')
      .set({ authorization: token })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toEqual('User is blocked')
          return done()
        }
      })
  })
  test('check if the blocker user can not follow the other user', (done) => {
    supertest(app)
      .patch('/api/v1/users/following/1')
      .set({ authorization: token2 })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toEqual('User is blocked')
          return done()
        }
      })
  })
  test('check if the blocker user can un block the user', (done) => {
    supertest(app)
      .patch('/api/v1/users/blocked/1')
      .set({ authorization: token2 })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.authUser[0].blocked.length).toEqual(0)
          return done()
        }
      })
  })

  test('check if the user can follow other user successfully after un block', (done) => {
    supertest(app)
      .patch('/api/v1/users/following/1')
      .set({ authorization: token2 })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data[0].followers.length).toEqual(1)
          return done()
        }
      })
  })
  test('get all following for specific user', (done) => {
    supertest(app)
      .get('/api/v1/users/2/following')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data.length).toEqual(1)
          return done()
        }
      })
  })
  test('get all followers for specific user', (done) => {
    supertest(app)
      .get('/api/v1/users/2/followers')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data.length).toEqual(0)
          return done()
        }
      })
  })
  test('get all blocked users for specific user', (done) => {
    supertest(app)
      .get('/api/v1/users/2/blocked')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data.length).toEqual(0)
          return done()
        }
      })
  })
})
