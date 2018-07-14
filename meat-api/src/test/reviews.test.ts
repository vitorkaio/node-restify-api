import 'jest';
import * as request from 'supertest';

const URL_SERVIDOR: string = 'http://localhost:3002'; 

test('GET /reviews', () => {
  return request(URL_SERVIDOR)
    .get('/reviews')
    .then(res => {
      expect(res.status).toBe(200);
    })
    .catch(fail);
})