export class BucketSpecModel {
  constructor({ bucketName, projectId, location, storageClass, uniformBucketLevelAccess, publicAccessPrevention, versioning }) {
    this.bucketName = bucketName;
    this.projectId = projectId;
    this.location = location;
    this.storageClass = storageClass;
    this.uniformBucketLevelAccess = uniformBucketLevelAccess;
    this.publicAccessPrevention = publicAccessPrevention;
    this.versioning = versioning;
  }
}
