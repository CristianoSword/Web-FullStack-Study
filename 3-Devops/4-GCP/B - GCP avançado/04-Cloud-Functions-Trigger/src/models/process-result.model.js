export class ProcessResultModel {
  constructor({ bucket, objectName, contentType, size }) {
    this.bucket = bucket;
    this.objectName = objectName;
    this.contentType = contentType;
    this.size = size;
  }
}
