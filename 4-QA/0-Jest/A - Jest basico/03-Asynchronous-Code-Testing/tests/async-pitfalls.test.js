const { fetchTaskById, login } = require('../src/services/api-service');

// ─────────────────────────────────────────────
// ARMADILHAS E BOAS PRÁTICAS
// ─────────────────────────────────────────────
describe('expect.assertions — garantia de execução do código assíncrono', () => {
  test('ERRO clássico: teste sem await SEMPRE passa (falso positivo)', async () => {
    // Se removermos o await abaixo, o teste passa sem verificar nada
    const taskPromise = fetchTaskById(1);
    await expect(taskPromise).resolves.toHaveProperty('id', 1);
  });

  test('expect.assertions garante que callbacks assíncronos foram chamados', async () => {
    expect.assertions(2);
    const task = await fetchTaskById(7);
    expect(task.id).toBe(7);
    expect(task.completed).toBe(false);
  });

  test('expect.hasAssertions protege contra silêncio em testes async', async () => {
    expect.hasAssertions();
    const result = await login('user@test.com', 'secreta');
    expect(result.token).toBeDefined();
  });
});

describe('Timeout e latência controlada', () => {
  test('operações paralelas são mais rápidas que sequenciais', async () => {
    const start = Date.now();
    await Promise.all([fetchTaskById(1), fetchTaskById(2), fetchTaskById(3)]);
    const elapsed = Date.now() - start;
    // 3 operações de ~50ms em paralelo devem terminar bem abaixo de 300ms
    expect(elapsed).toBeLessThan(200);
  });
});
