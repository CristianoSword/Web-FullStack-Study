export class SpacesBucketModel {
  constructor({ bucketName, region, endpoint, cdnDomain }) {
    this.bucketName = bucketName;
    this.region = region;
    this.endpoint = endpoint;
    this.cdnDomain = cdnDomain;
  }
}
