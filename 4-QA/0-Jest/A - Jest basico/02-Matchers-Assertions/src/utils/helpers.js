const { AppError } = require('../models/data-models');

/**
 * Funções utilitárias que serão alvo dos testes de matchers.
 */

/**
 * Soma dois números.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new AppError('Os argumentos devem ser números', 400);
  }
  return a + b;
}

/**
 * Filtra produtos por categoria.
 * @param {Array} products
 * @param {string} category
 * @returns {Array}
 */
function filterByCategory(products, category) {
  if (!Array.isArray(products)) throw new AppError('products deve ser um array', 400);
  return products.filter((p) => p.category === category);
}

/**
 * Calcula a média de uma lista de scores.
 * @param {number[]} scores
 * @returns {number}
 */
function average(scores) {
  if (!scores || scores.length === 0) return 0;
  const total = scores.reduce((acc, s) => acc + s, 0);
  return parseFloat((total / scores.length).toFixed(2));
}

/**
 * Busca um usuário por id numa lista.
 * @param {Array} users
 * @param {number} id
 * @returns {object|null}
 */
function findUserById(users, id) {
  return users.find((u) => u.id === id) ?? null;
}

/**
 * Normaliza texto: remove espaços extras, converte pra minúsculas.
 * @param {string} text
 * @returns {string}
 */
function normalizeText(text) {
  if (typeof text !== 'string') throw new AppError('text deve ser string', 400);
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

module.exports = { sum, filterByCategory, average, findUserById, normalizeText };
