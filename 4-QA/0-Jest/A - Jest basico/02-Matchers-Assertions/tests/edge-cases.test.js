const { sum, average, normalizeText, findUserById } = require('../src/utils/helpers');
const { createUser } = require('../src/models/data-models');

// ─────────────────────────────────────────────
// EDGE CASES E VALIDAÇÕES
// ─────────────────────────────────────────────
describe('Edge cases — valores limite e entradas inesperadas', () => {
  test('sum com zero', () => {
    expect(sum(0, 0)).toBe(0);
    expect(sum(-5, 5)).toBe(0);
    expect(sum(-3, -7)).toBe(-10);
  });

  test('average com array de um elemento', () => {
    expect(average([42])).toBe(42);
  });

  test('average com array vazio retorna 0', () => {
    expect(average([])).toBe(0);
    expect(average(null)).toBe(0);
  });

  test('average com decimais precisos', () => {
    expect(average([1.1, 2.2, 3.3])).toBeCloseTo(2.2, 1);
  });

  test('normalizeText com string vazia', () => {
    expect(normalizeText('')).toBe('');
  });

  test('normalizeText com múltiplos espaços internos', () => {
    expect(normalizeText('A    B    C')).toBe('a b c');
  });

  test('findUserById em lista de múltiplos usuários', () => {
    const users = [
      createUser({ id: 1, name: 'Alice' }),
      createUser({ id: 2, name: 'Bob' }),
      createUser({ id: 3, name: 'Charlie' }),
    ];
    expect(findUserById(users, 2)).toMatchObject({ name: 'Bob' });
    expect(findUserById(users, 99)).toBeNull();
  });
});

// ─────────────────────────────────────────────
// expect.any / expect.anything / asymmetric matchers
// ─────────────────────────────────────────────
describe('Asymmetric matchers — expect.any / expect.anything / expect.arrayContaining', () => {
  test('expect.any(Number) valida tipo numérico', () => {
    const user = createUser();
    expect(user.score).toEqual(expect.any(Number));
    expect(user.id).toEqual(expect.any(Number));
  });

  test('expect.any(String) valida tipo string', () => {
    const user = createUser();
    expect(user.name).toEqual(expect.any(String));
  });

  test('expect.anything() ignora valor mas exige presença', () => {
    const user = createUser();
    expect(user.name).toEqual(expect.anything());
  });

  test('expect.arrayContaining valida subconjunto de array', () => {
    const cats = ['eletronicos', 'perifericos', 'moveis'];
    expect(cats).toEqual(expect.arrayContaining(['eletronicos', 'perifericos']));
  });

  test('expect.objectContaining valida subconjunto de objeto', () => {
    const user = createUser({ id: 7 });
    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        active: expect.any(Boolean),
      })
    );
  });

  test('expect.stringContaining verifica substring', () => {
    expect('Hello World Jest').toEqual(expect.stringContaining('Jest'));
  });

  test('expect.stringMatching verifica regex', () => {
    const user = createUser({ name: 'Ana Silva' });
    expect(user.name).toEqual(expect.stringMatching(/Silva$/));
  });
});
