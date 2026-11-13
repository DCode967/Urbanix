const { test } = require('node:test');
const assert = require('node:assert/strict');
const { responderAsistente } = require('../src/controllers/asistente.controller');

function responseMock() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; }
  };
}

test('rechaza preguntas vacías o demasiado largas', async () => {
  const res = responseMock();
  await responderAsistente({ body: { pregunta: '   ' } }, res);
  assert.equal(res.statusCode, 400);
  await responderAsistente({ body: { pregunta: 'x'.repeat(501) } }, res);
  assert.equal(res.statusCode, 400);
});

test('informa que falta configurar la API de IA', async () => {
  const claveAnterior = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  const res = responseMock();
  await responderAsistente({ body: { pregunta: '¿Cuánto cuesta el envío?' } }, res);
  assert.equal(res.statusCode, 503);
  assert.match(res.body.message, /no está configurado/i);
  if (claveAnterior !== undefined) process.env.OPENAI_API_KEY = claveAnterior;
});
test('limita consultas repetidas desde la misma IP', async () => {
  const claveAnterior = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  const ip = '192.0.2.42';
  let res;
  for (let indice = 0; indice < 31; indice += 1) {
    res = responseMock();
    await responderAsistente({ ip, body: { pregunta: 'hola' } }, res);
  }
  assert.equal(res.statusCode, 429);
  if (claveAnterior !== undefined) process.env.OPENAI_API_KEY = claveAnterior;
});
