const { UserRepository } = require('../src/db/user-repository');

/**
 * UserService — camada de negócio entre controller e repositório.
 * Demonstra o uso de beforeAll/afterAll (conexão) e beforeEach/afterEach (isolamento).
 */
class UserService {
  constructor(repo) {
    this.repo = repo;
  }

  register({ name, email, role }) {
    // Regra de negócio: email deve ser único
    const all = this.repo.findAll();
    if (all.find((u) => u.email === email)) {
      throw new Error(`Email ${email} já cadastrado`);
    }
    return this.repo.create({ name, email, role });
  }

  promote(id) {
    const user = this.repo.findById(id);
    if (!user) throw new Error('Usuário não encontrado');
    if (user.role === 'admin') throw new Error('Usuário já é admin');
    return this.repo.update(id, { role: 'admin' });
  }

  remove(id) {
    const user = this.repo.findById(id);
    if (!user) throw new Error('Usuário não encontrado');
    this.repo.delete(id);
    return true;
  }

  listAll() {
    return this.repo.findAll();
  }
}

module.exports = { UserService };
