export class DynamoTableModel {
  constructor({ tableName, billingMode, partitionKey, sortKey, indexes, ttlAttribute }) {
    this.tableName = tableName;
    this.billingMode = billingMode;
    this.partitionKey = partitionKey;
    this.sortKey = sortKey;
    this.indexes = indexes ?? [];
    this.ttlAttribute = ttlAttribute;
  }
}
