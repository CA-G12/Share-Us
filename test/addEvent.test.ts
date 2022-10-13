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
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.history.com%2Ftopics%2Fhalloween&psig=AOvVaw12EN0knKVxueTyB7dW587V&ust=1665650997733000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLDXl9Sn2voCFQAAAAAdAAAAABAD',
        status: 'upcoming',
        startTime: '2022-12-24 08:59:37.398 +00:00',
        endTime: '2022-12-30 08:59:37.398 +00:00',
        longitude: '12,15,200',
        latitude: '20,5,156'
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
        longitude: '12,15,200',
        latitude: '20,5,156'
      })
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe('You should fill all the required fields')
        return done()
      })
  })
})
