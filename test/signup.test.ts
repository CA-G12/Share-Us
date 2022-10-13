// const supertest = require('supertest');
// const router = require('../app');
// const connection = require('../database/config/connection');
import { describe, expect, test } from '@jest/globals'
import supertest from 'supertest'
import { sequelize } from '../src/db'
import { build } from '../src/db/build'
import app from '../src/app'
// import { Response } from 'express'

beforeAll(() => build())
afterAll(() => sequelize.close())

describe('sign up router', () => {
  test('check if the user added successfully', (done) => {
    supertest(app)
      .post('/api/v1/signup')
      .send({
        password: '123456',
        email: 'saifff@gmail.com',
        username: 'saif',
        confirmPassword: '123456'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) done(err)
        else {
          console.log('second')
          expect(res.body.username).toEqual('saif')
          return done()
        }
      })
  })
  test('check if the user already exists', (done) => {
    supertest(app)
      .post('/api/v1/signup')
      .send({
        password: '123456',
        email: 'saifff@gmail.com',
        username: 'saif',
        confirmPassword: '123456'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) return done(err)
        else {
          expect(res.body).toEqual('username already exists')
          return done()
        }
      })
  })
  test('check if the user already exists', (done) => {
    supertest(app)
      .post('/api/v1/signup')
      .send({
        password: '123456',
        email: 'saifff@gmail.com',
        username: 'saifffff',
        confirmPassword: '123456'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) return done(err)
        else {
          expect(res.body).toEqual('email already exists')
          return done()
        }
      })
  })
  test('check if the password exists', (done) => {
    supertest(app)
      .post('/api/v1/signup')
      .send({
        password: '123456',
        email: 'saifff@gmail.com',
        username: 'saifffff',
        confirmPassword: '1234567'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err:any, res: any) => {
        if (err) return done(err)
        else {
          expect(res.body.details[0].message).toEqual('"confirmPassword" must be [ref:password]')
          return done()
        }
      })
  })
})
