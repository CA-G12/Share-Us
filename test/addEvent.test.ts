import { describe, expect, test } from '@jest/globals'
import supertest from 'supertest'
import app from '../src/app'

describe('Adding event', () => {
  test('Insert data', done => {
    supertest(app)
      .post('/api/v1/addEvent')
      .send({
        name: 'Halloween party',
        description: 'you should wear a custom',
        img:
          'https://www.history.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTU4MDgyMjQyMTM5MTM3ODE3/halloween.jpg',
        status: 'upcoming',
        startTime: '2022-12-24 08:59:37.398 +00:00',
        endTime: '2022-12-30 08:59:37.398 +00:00',
        longitude: '35.233154',
        latitude: '31.952162'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe('inserted successfully')
        return done()
      })
  })
  test('Image field empty', done => {
    supertest(app)
      .post('/api/v1/addEvent')
      .send({
        name: 'Halloween party',
        description: 'you should wear a custom',
        status: 'upcoming',
        startTime: '2022-12-24 08:59:37.398 +00:00',
        endTime: '2022-12-30 08:59:37.398 +00:00',
        longitude: '35.233154',
        latitude: '31.952162'
      })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe('You should fill all the required fields')
        return done()
      })
  })
})
