export class DbUserModel {
  constructor({ name, role, databases }) {
    this.name = name;
    this.role = role;
    this.databases = databases ?? [];
  }
}
