/* eslint-disable no-undef */

import { describe, expect, test } from '@jest/globals'
import supertest from 'supertest'
import { sequelize } from '../src/db'
import { build } from '../src/db/build'
import app from '../src/app'

beforeAll(() => build())
afterAll(() => sequelize.close())

describe('sign in router', () => {
  test('check if the user logged in successfully', (done) => {
    supertest(app)
      .post('/api/v1/login')
      .send({
        email: 'most07173@gmail.com',
        password: '123'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.user.email).toEqual('most07173@gmail.com')
          return done()
        }
      })
  })

  test('check if email not exist', (done) => {
    supertest(app)
      .post('/api/v1/login')
      .send({
        email: 'most0717883@gmail.com',
        password: '123'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toEqual('email not exist')
          return done()
        }
      })
  })
  test('check if email not exist', (done) => {
    supertest(app)
      .post('/api/v1/login')
      .send({
        email: 'most07173@gmail.com',
        password: '12385'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          expect(res.body.message).toEqual('password not match')
          return done()
        }
      })
  })
})
