export class RedirectRules {
  constructor({ rules }) {
    this.rules = rules;
  }

  static from(raw) {
    return new RedirectRules(raw);
  }
}
