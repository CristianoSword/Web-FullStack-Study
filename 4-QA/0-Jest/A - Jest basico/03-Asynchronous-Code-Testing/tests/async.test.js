const { fetchTaskById, login, fetchTasksInParallel, uploadWithCallback } = require('../src/services/api-service');

// ─────────────────────────────────────────────
// PADRÃO 1: retornando a Promise diretamente
// ─────────────────────────────────────────────
describe('Async via retorno de Promise', () => {
  test('fetchTaskById retorna task com id correto', () => {
    return fetchTaskById(5).then((task) => {
      expect(task.id).toBe(5);
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('completed', false);
    });
  });

  test('fetchTaskById rejeita com id inválido', () => {
    return expect(fetchTaskById(-1)).rejects.toThrow('ID inválido: -1');
  });
});

// ─────────────────────────────────────────────
// PADRÃO 2: .resolves / .rejects inline
// ─────────────────────────────────────────────
describe('Async via resolves/rejects matchers', () => {
  test('fetchTaskById resolve com objeto Task válido', async () => {
    await expect(fetchTaskById(10)).resolves.toMatchObject({
      id: 10,
      completed: false,
    });
  });

  test('login com credenciais inválidas rejeita corretamente', async () => {
    await expect(login('', '')).rejects.toThrow('Credenciais inválidas');
  });

  test('login com senha errada rejeita com mensagem específica', async () => {
    await expect(login('user@test.com', 'wrong')).rejects.toThrow('Senha incorreta');
  });
});

// ─────────────────────────────────────────────
// PADRÃO 3: async/await com try/catch
// ─────────────────────────────────────────────
describe('Async/await com try/catch', () => {
  test('login retorna token ao autenticar com sucesso', async () => {
    const response = await login('dev@lab.io', 'senha123');
    expect(response).toMatchObject({
      email: 'dev@lab.io',
      token: expect.any(String),
    });
    expect(response.token.length).toBeGreaterThan(0);
  });

  test('fetchTaskById falha e captura erro via try/catch', async () => {
    expect.assertions(1); // garante que o catch foi executado
    try {
      await fetchTaskById(0);
    } catch (err) {
      expect(err.message).toContain('ID inválido');
    }
  });
});

// ─────────────────────────────────────────────
// PADRÃO 4: Promise.all em paralelo
// ─────────────────────────────────────────────
describe('Execução paralela com Promise.all', () => {
  test('fetchTasksInParallel retorna todas as tasks', async () => {
    const tasks = await fetchTasksInParallel([1, 2, 3]);
    expect(tasks).toHaveLength(3);
    expect(tasks[0].id).toBe(1);
    expect(tasks[2].id).toBe(3);
  });

  test('fetchTasksInParallel rejeita se qualquer id for inválido', async () => {
    await expect(fetchTasksInParallel([1, -1, 3])).rejects.toThrow('ID inválido');
  });
});

// ─────────────────────────────────────────────
// PADRÃO 5: callbacks com done()
// ─────────────────────────────────────────────
describe('Async via callbacks com done()', () => {
  test('uploadWithCallback chama callback com sucesso', (done) => {
    uploadWithCallback('payload-data', (err, result) => {
      expect(err).toBeNull();
      expect(result).toContain('bytes');
      done();
    });
  });

  test('uploadWithCallback chama callback com erro em dado vazio', (done) => {
    uploadWithCallback(null, (err, result) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Dados vazios');
      expect(result).toBeUndefined();
      done();
    });
  });
});
