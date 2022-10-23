import { describe, expect, test } from '@jest/globals'
import supertest from 'supertest'
import { sequelize } from '../src/db'
import { build } from '../src/db/build'
import app from '../src/app'

beforeAll(() => build())
afterAll(() => sequelize.close())

describe('Following system routers', () => {
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
  '.eyJpZCI6NCwidXNlcm5hbWUiOiJzZWVmZGZmZnNkZmRmZnNkIiwiaWF0IjoxNjY2Mzc5MTg0fQ' +
  '.3zyCFJyMYaicqo1J1v-JK1OQvM9i4eCSMDxtyLMFZtE'
  test('check if the user can follow other user successfully', (done) => {
    supertest(app)
      .patch('/api/v1/users/2/followers/1')
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
      .patch('/api/v1/users/1/followers/2')
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
  test('check if the user can un follow other user successfully', (done) => {
    supertest(app)
      .patch('/api/v1/users/2/followers/1')
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
  test('check if the user can un following other user successfully', (done) => {
    supertest(app)
      .patch('/api/v1/users/2/following/1')
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
      .patch('/api/v1/users/1/followers/2')
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
      .patch('/api/v1/users/2/blocked/1')
      .set({ authorization: token })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data[0].blocked.length).toEqual(1)
          expect(res.body.data[0].following.length).toEqual(0)
          return done()
        }
      })
  })
  test('check if the blocked user can not follow the other user', (done) => {
    supertest(app)
      .patch('/api/v1/users/1/followers/2')
      .set({ authorization: token })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toEqual('User id blocked')
          return done()
        }
      })
  })
  test('check if the blocker user can not follow the other user', (done) => {
    supertest(app)
      .patch('/api/v1/users/2/followers/1')
      .set({ authorization: token })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toEqual('User id blocked')
          return done()
        }
      })
  })
  test('check if the blocker user can un block the user', (done) => {
    supertest(app)
      .patch('/api/v1/users/2/blocked/1')
      .set({ authorization: token })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.data[0].blocked.length).toEqual(0)
          return done()
        }
      })
  })

  test('check if the user can follow other user successfully after un block', (done) => {
    supertest(app)
      .patch('/api/v1/users/2/followers/1')
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
  test('get all following for specific user', (done) => {
    supertest(app)
      .get('/api/v1/users/2/following')
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
  test('get all followers for specific user', (done) => {
    supertest(app)
      .get('/api/v1/users/2/followers')
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
