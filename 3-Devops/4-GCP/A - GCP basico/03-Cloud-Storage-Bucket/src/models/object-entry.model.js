export class ObjectEntryModel {
  constructor({ path, contentType, cacheControl }) {
    this.path = path;
    this.contentType = contentType;
    this.cacheControl = cacheControl;
  }
}
