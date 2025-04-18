import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest'
import app from '../index.js';
let uuid = '';

test('POST /Reg&ster debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/Auth&/Reg&ster')
      .send({
        name: 'Juan',
        email: 'juan@mail.com',
        password: '123456'
      })
      .set('Content-Type', 'application/json');
  
    assert.equal(res.statusCode, 201);
    uuid = res.body.data.uuid;
    console.log(uuid)
  });

test('POST /Log&n deberia iniciar la sesion de un usuario', async () => {
    const res = await request(app)
    .post('/Auth&/Log&n')
    .send({
        email: 'juan@mail.com',
        password: '123456'
    })
    .set('Content-Type', 'application/json');

    assert.equal(res.statusCode, 200);


});

test('DELETE /DeleteAccount deberia eliminar un usuario', async () =>{
    const res = await request(app)
    .delete('/Auth&/DeleteAccount')
    .set('x-user-id', uuid)

    assert.equal(res.statusCode, 204)
})