export class ManifestCheckModel {
  constructor({ file, kind, purpose, tokens }) {
    this.file = file;
    this.kind = kind;
    this.purpose = purpose;
    this.tokens = tokens;
  }
}
