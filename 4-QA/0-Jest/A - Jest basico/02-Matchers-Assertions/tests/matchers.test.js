const { sum, filterByCategory, average, findUserById, normalizeText } = require('../src/utils/helpers');
const { createUser, createProductList, AppError } = require('../src/models/data-models');

// ─────────────────────────────────────────────
// MATCHERS PRIMITIVOS
// ─────────────────────────────────────────────
describe('Matchers primitivos — toBe / toEqual / toStrictEqual', () => {
  test('toBe verifica igualdade por referência (primitivos)', () => {
    expect(sum(2, 3)).toBe(5);
    expect(typeof sum(1, 1)).toBe('number');
  });

  test('toEqual compara profundamente objetos', () => {
    const user = createUser({ id: 42, name: 'Carlos' });
    expect(user).toEqual({
      id: 42,
      name: 'Carlos',
      score: 95.5,
      active: true,
    });
  });

  test('toStrictEqual detecta undefined em propriedades', () => {
    expect({ a: 1, b: undefined }).not.toStrictEqual({ a: 1 });
  });
});

// ─────────────────────────────────────────────
// MATCHERS DE VERACIDADE (TRUTHINESS)
// ─────────────────────────────────────────────
describe('Matchers de veracidade — toBeTruthy / toBeFalsy / toBeNull', () => {
  test('usuário com active=true é truthy', () => {
    const user = createUser();
    expect(user.active).toBeTruthy();
  });

  test('findUserById retorna null se não encontrar', () => {
    const users = [createUser({ id: 1 })];
    expect(findUserById(users, 99)).toBeNull();
  });

  test('lista vazia é falsy no contexto de comprimento', () => {
    expect([].length).toBeFalsy();
  });

  test('toBeUndefined funciona em propriedade ausente', () => {
    const obj = {};
    expect(obj.naoExiste).toBeUndefined();
  });

  test('toBeDefined funciona em propriedade presente', () => {
    const user = createUser();
    expect(user.name).toBeDefined();
  });
});

// ─────────────────────────────────────────────
// MATCHERS NUMÉRICOS
// ─────────────────────────────────────────────
describe('Matchers numéricos — toBeGreaterThan / toBeCloseTo', () => {
  test('média de scores é maior que zero', () => {
    expect(average([80, 90, 100])).toBeGreaterThan(0);
  });

  test('média retorna valor correto com toBeCloseTo', () => {
    expect(average([1, 2, 3])).toBeCloseTo(2.0, 1);
  });

  test('toBeGreaterThanOrEqual e toBeLessThan', () => {
    expect(sum(5, 5)).toBeGreaterThanOrEqual(10);
    expect(sum(1, 1)).toBeLessThan(5);
  });

  test('score de usuário padrão está no range 0-100', () => {
    const user = createUser();
    expect(user.score).toBeGreaterThanOrEqual(0);
    expect(user.score).toBeLessThanOrEqual(100);
  });
});

// ─────────────────────────────────────────────
// MATCHERS DE STRING
// ─────────────────────────────────────────────
describe('Matchers de string — toContain / toMatch', () => {
  test('toContain verifica substring', () => {
    const text = normalizeText('  Olá   Mundo  ');
    expect(text).toContain('olá');
  });

  test('toMatch verifica regex em string', () => {
    const user = createUser({ name: 'Maria Costa' });
    expect(user.name).toMatch(/^Maria/);
  });

  test('normalizeText remove espaços e converte pra minúsculas', () => {
    expect(normalizeText('  JEST   TESTING  ')).toBe('jest testing');
  });
});

// ─────────────────────────────────────────────
// MATCHERS DE ARRAY
// ─────────────────────────────────────────────
describe('Matchers de array — toContain / toHaveLength / toContainEqual', () => {
  test('lista de produtos tem 4 itens', () => {
    expect(createProductList()).toHaveLength(4);
  });

  test('categorias dos produtos contêm eletronicos', () => {
    const cats = createProductList().map((p) => p.category);
    expect(cats).toContain('eletronicos');
  });

  test('toContainEqual verifica objeto dentro do array', () => {
    const products = createProductList();
    expect(products).toContainEqual(
      expect.objectContaining({ name: 'Mouse Gamer', category: 'perifericos' })
    );
  });

  test('filtro por categoria retorna apenas perifericos', () => {
    const perifericos = filterByCategory(createProductList(), 'perifericos');
    expect(perifericos).toHaveLength(2);
    perifericos.forEach((p) => expect(p.category).toBe('perifericos'));
  });
});

// ─────────────────────────────────────────────
// MATCHERS DE OBJETOS
// ─────────────────────────────────────────────
describe('Matchers de objetos — toMatchObject / toHaveProperty', () => {
  test('toHaveProperty verifica existência e valor de propriedade aninhada', () => {
    const user = createUser();
    expect(user).toHaveProperty('name', 'Ana Silva');
    expect(user).toHaveProperty('score');
  });

  test('toMatchObject verifica subconjunto de propriedades', () => {
    const user = createUser({ id: 10 });
    expect(user).toMatchObject({ id: 10, active: true });
  });
});

// ─────────────────────────────────────────────
// MATCHERS DE ERRO
// ─────────────────────────────────────────────
describe('Matchers de erro — toThrow / toThrowError', () => {
  test('sum lança AppError ao receber não-número', () => {
    expect(() => sum('a', 2)).toThrow(AppError);
    expect(() => sum('a', 2)).toThrow('Os argumentos devem ser números');
  });

  test('filterByCategory lança erro se products não for array', () => {
    expect(() => filterByCategory(null, 'x')).toThrow('products deve ser um array');
  });

  test('normalizeText lança erro se text não for string', () => {
    expect(() => normalizeText(123)).toThrowError(AppError);
  });
});
