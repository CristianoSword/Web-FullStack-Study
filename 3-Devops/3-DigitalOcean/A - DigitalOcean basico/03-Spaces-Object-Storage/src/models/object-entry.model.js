export class ObjectEntryModel {
  constructor({ key, contentType, cacheControl }) {
    this.key = key;
    this.contentType = contentType;
    this.cacheControl = cacheControl;
  }
}
