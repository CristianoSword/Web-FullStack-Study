export class CdnAssetModel {
  constructor({ key, publicUrl, cacheControl }) {
    this.key = key;
    this.publicUrl = publicUrl;
    this.cacheControl = cacheControl;
  }
}
