export class CommitEntryModel {
  constructor({ sha, type, message }) {
    this.sha = sha;
    this.type = type;
    this.message = message;
  }
}
