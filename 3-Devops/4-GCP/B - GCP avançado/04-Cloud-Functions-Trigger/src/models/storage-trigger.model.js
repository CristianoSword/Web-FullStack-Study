export class StorageTriggerModel {
  constructor({ bucket, eventType, retry, eventFilters }) {
    this.bucket = bucket;
    this.eventType = eventType;
    this.retry = retry;
    this.eventFilters = eventFilters;
  }
}
