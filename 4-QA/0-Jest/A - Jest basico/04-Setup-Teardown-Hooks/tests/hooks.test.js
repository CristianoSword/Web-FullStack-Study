const { UserRepository } = require('../src/db/user-repository');
const { UserService } = require('../src/services/user-service');

// ─────────────────────────────────────────────
// beforeAll / afterAll — conexão compartilhada da suite
// ─────────────────────────────────────────────
describe('UserRepository — beforeAll / afterAll', () => {
  let repo;

  beforeAll(() => {
    // Executado UMA VEZ antes de todos os testes deste describe
    repo = new UserRepository();
    repo.connect();
    console.log('[beforeAll] Repositório conectado');
  });

  afterAll(() => {
    // Executado UMA VEZ depois de todos os testes deste describe
    repo.disconnect();
    console.log('[afterAll] Repositório desconectado');
  });

  test('repositório está conectado após beforeAll', () => {
    expect(repo._isConnected).toBe(true);
  });

  test('cria usuário com id auto-incrementado', () => {
    const u1 = repo.create({ name: 'Alice', email: 'alice@test.com' });
    const u2 = repo.create({ name: 'Bob', email: 'bob@test.com' });
    expect(u1.id).toBe(1);
    expect(u2.id).toBe(2);
  });

  test('findAll retorna todos os usuários criados', () => {
    expect(repo.findAll()).toHaveLength(2);
  });
});

// ─────────────────────────────────────────────
// beforeEach / afterEach — isolamento por teste
// ─────────────────────────────────────────────
describe('UserService — beforeEach / afterEach para isolamento', () => {
  let repo;
  let service;

  beforeEach(() => {
    // Cria um repositório LIMPO antes de CADA teste
    repo = new UserRepository().connect();
    service = new UserService(repo);
    console.log('[beforeEach] Estado limpo criado');
  });

  afterEach(() => {
    // Garante limpeza total após CADA teste
    repo.disconnect();
    console.log('[afterEach] Estado limpo destruído');
  });

  test('register cria usuário com dados corretos', () => {
    const user = service.register({ name: 'Carlos', email: 'carlos@test.com' });
    expect(user).toMatchObject({ name: 'Carlos', email: 'carlos@test.com', role: 'user' });
    expect(user.id).toEqual(expect.any(Number));
  });

  test('register lança erro em email duplicado', () => {
    service.register({ name: 'Carlos', email: 'carlos@test.com' });
    expect(() => service.register({ name: 'Carlos 2', email: 'carlos@test.com' }))
      .toThrow('já cadastrado');
  });

  test('register não polui estado entre testes (isolamento)', () => {
    // Este teste começa com repositório VAZIO graças ao beforeEach
    expect(service.listAll()).toHaveLength(0);
  });

  test('promote eleva role de user para admin', () => {
    const user = service.register({ name: 'Diana', email: 'diana@test.com' });
    const promoted = service.promote(user.id);
    expect(promoted.role).toBe('admin');
  });

  test('promote lança erro se usuário já for admin', () => {
    const user = service.register({ name: 'Eric', email: 'eric@test.com', role: 'admin' });
    expect(() => service.promote(user.id)).toThrow('já é admin');
  });

  test('remove exclui usuário com sucesso', () => {
    const user = service.register({ name: 'Fiona', email: 'fiona@test.com' });
    expect(service.remove(user.id)).toBe(true);
    expect(repo.findById(user.id)).toBeNull();
  });
});

// ─────────────────────────────────────────────
// Hooks assíncronos
// ─────────────────────────────────────────────
describe('Hooks assíncronos com async/await', () => {
  let repo;
  let seedUsers;

  beforeAll(async () => {
    repo = new UserRepository().connect();
    // Simula operação assíncrona de seed
    await new Promise((r) => setTimeout(r, 20));
    seedUsers = [
      repo.create({ name: 'Seed1', email: 's1@test.com' }),
      repo.create({ name: 'Seed2', email: 's2@test.com' }),
    ];
  });

  afterAll(async () => {
    await new Promise((r) => setTimeout(r, 10));
    repo.disconnect();
  });

  test('seed criou 2 usuários', () => {
    expect(repo.count()).toBe(2);
  });

  test('seed users têm ids corretos', () => {
    expect(seedUsers[0].id).toBe(1);
    expect(seedUsers[1].id).toBe(2);
  });
});
