const { makeTask, makeAuthResponse } = require('../models/response-models');

/**
 * Simula um serviço de API com atraso artificial.
 * Todos os métodos retornam Promises para cobrir cenários async reais.
 */

/**
 * Simula busca de tarefa por ID com delay.
 * @param {number} id
 * @returns {Promise<import('../models/response-models').Task>}
 */
function fetchTaskById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error(`ID inválido: ${id}`));
        return;
      }
      resolve(makeTask({ id }));
    }, 50);
  });
}

/**
 * Simula login com autenticação.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('../models/response-models').AuthResponse>}
 */
async function login(email, password) {
  await new Promise((r) => setTimeout(r, 30));
  if (!email || !password) {
    throw new Error('Credenciais inválidas');
  }
  if (password === 'wrong') {
    throw new Error('Senha incorreta');
  }
  return makeAuthResponse();
}

/**
 * Busca múltiplas tarefas em paralelo.
 * @param {number[]} ids
 * @returns {Promise<Array>}
 */
async function fetchTasksInParallel(ids) {
  return Promise.all(ids.map((id) => fetchTaskById(id)));
}

/**
 * Simula upload com callback (padrão Node.js antigo).
 * @param {Buffer|string} data
 * @param {(err: Error|null, result?: string) => void} callback
 */
function uploadWithCallback(data, callback) {
  setTimeout(() => {
    if (!data) {
      callback(new Error('Dados vazios'));
      return;
    }
    callback(null, `uploaded:${data.toString().length}bytes`);
  }, 40);
}

module.exports = { fetchTaskById, login, fetchTasksInParallel, uploadWithCallback };
