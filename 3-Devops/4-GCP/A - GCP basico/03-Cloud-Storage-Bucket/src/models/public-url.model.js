export class PublicUrlModel {
  constructor({ path, url, cacheControl }) {
    this.path = path;
    this.url = url;
    this.cacheControl = cacheControl;
  }
}
