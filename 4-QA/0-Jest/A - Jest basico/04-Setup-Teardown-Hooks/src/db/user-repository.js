/**
 * Simula um repositório em memória de usuários.
 * Representa a camada de dados que precisa de setup/teardown entre testes.
 */
class UserRepository {
  constructor() {
    /** @type {Map<number, {id: number, name: string, email: string, role: string}>} */
    this._store = new Map();
    this._nextId = 1;
    this._isConnected = false;
  }

  connect() {
    this._isConnected = true;
    return this;
  }

  disconnect() {
    this._isConnected = false;
    this._store.clear();
    this._nextId = 1;
  }

  _requireConnected() {
    if (!this._isConnected) throw new Error('Repositório não conectado');
  }

  create({ name, email, role = 'user' }) {
    this._requireConnected();
    if (!name || !email) throw new Error('name e email são obrigatórios');
    const id = this._nextId++;
    const user = { id, name, email, role };
    this._store.set(id, user);
    return { ...user };
  }

  findById(id) {
    this._requireConnected();
    return this._store.get(id) ?? null;
  }

  findAll() {
    this._requireConnected();
    return Array.from(this._store.values());
  }

  update(id, data) {
    this._requireConnected();
    const existing = this._store.get(id);
    if (!existing) throw new Error(`Usuário ${id} não encontrado`);
    const updated = { ...existing, ...data, id };
    this._store.set(id, updated);
    return { ...updated };
  }

  delete(id) {
    this._requireConnected();
    return this._store.delete(id);
  }

  count() {
    return this._store.size;
  }
}

module.exports = { UserRepository };
