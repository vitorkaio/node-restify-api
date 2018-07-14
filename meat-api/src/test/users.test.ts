import 'jest';
import * as request from 'supertest';
import env from './../../server/common/env';
import { Server } from './../../server/server'
import userRouter from './../routes/users.router';
import { Users } from './../models/users.model';

const URL_SERVIDOR: string = 'http://localhost:3002'; 

// Executa antes de todos os testes.
let server = new Server();
beforeAll(() => {
  // Inicia um serviço de testes com outras configurações de servidor.
  env.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-teste';
  env.server.port = process.env.SERVER_PORT || 3002;
  return server.bootstrap([userRouter])
    .then(() => {
      Users.remove({}).exec(); // Toda vez que o teste terminar, limpe o mongodb.
    })
    .catch(error => {
      console.log('Erro ao iniciar servidor de testes');
      console.error(error);
    });
});

// Testando a rota GET /users
test('GET /users', () => {
  return request(URL_SERVIDOR)
    .get('/users')
    .then(res => {
      expect(res.status).toBe(200); // Espera que a resposta seja 200
      expect(res.body).toHaveProperty('message'); // Verifica se tem o campo message
      expect(res.body).toHaveProperty('status'); // Verifica se tem o campo message
      expect(res.body.status).toEqual('success'); // Verifica se o status é success
    })
    .catch(fail)
});

// Testando a rota POST /users
test('POST /users', () => {
  return request(URL_SERVIDOR)
    .post('/users')
    .send({
      name: 'teste',
      email: 'teste@email.com',
      password: '159',
      cpf: '35126454455'
    })
    .then(res => {
      expect(res.status).toBe(200); // Espera que a resposta seja 200
      expect(res.body._id).toBeDefined();
      expect(res.body.name).toBe('teste');
      expect(res.body.email).toBe('teste@email.com');
      expect(res.body.cpf).toBe('35126454455');
      expect(res.body.password).toBeUndefined(); // verifica se o password é undefined
    })
    .catch(fail)
});


// é executado depois de todos os tests
afterAll(() => {
  server.shutdown();
});