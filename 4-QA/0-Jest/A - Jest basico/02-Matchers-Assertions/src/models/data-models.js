/**
 * Modelos de dados usados nos testes de matchers.
 * Cobrem primitivos, arrays, objetos aninhados e erros tipados.
 */

/** @typedef {{ id: number, name: string, score: number, active: boolean }} User */

/**
 * Cria um usuário com dados padrão opcionais.
 * @param {Partial<User>} overrides
 * @returns {User}
 */
function createUser(overrides = {}) {
  return {
    id: 1,
    name: 'Ana Silva',
    score: 95.5,
    active: true,
    ...overrides,
  };
}

/**
 * Cria uma lista de produtos com categoria.
 * @returns {Array<{id: number, name: string, price: number, category: string}>}
 */
function createProductList() {
  return [
    { id: 101, name: 'Notebook Pro', price: 4500.0, category: 'eletronicos' },
    { id: 102, name: 'Teclado Mecânico', price: 350.0, category: 'perifericos' },
    { id: 103, name: 'Mouse Gamer', price: 220.0, category: 'perifericos' },
    { id: 104, name: 'Monitor 4K', price: 2800.0, category: 'eletronicos' },
  ];
}

/**
 * Erro customizado com código de status HTTP.
 */
class AppError extends Error {
  /**
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

module.exports = { createUser, createProductList, AppError };
