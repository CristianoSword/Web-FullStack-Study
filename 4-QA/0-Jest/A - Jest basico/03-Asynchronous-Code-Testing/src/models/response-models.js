/**
 * Modelos de resposta simulando retornos de APIs externas.
 */

/** @typedef {{ id: number, title: string, completed: boolean, userId: number }} Task */
/** @typedef {{ id: number, email: string, token: string }} AuthResponse */

/**
 * Cria uma Task fake.
 * @param {Partial<Task>} overrides
 * @returns {Task}
 */
function makeTask(overrides = {}) {
  return {
    id: Math.floor(Math.random() * 1000),
    title: 'Estudar testes assíncronos',
    completed: false,
    userId: 1,
    ...overrides,
  };
}

/**
 * Cria uma resposta de autenticação fake.
 * @returns {AuthResponse}
 */
function makeAuthResponse() {
  return {
    id: 1,
    email: 'dev@lab.io',
    token: 'jwt.fake.token.xyz',
  };
}

module.exports = { makeTask, makeAuthResponse };
