export class VerificationCheckModel {
  constructor({ name, command, expected }) {
    this.name = name;
    this.command = command;
    this.expected = expected;
  }
}
