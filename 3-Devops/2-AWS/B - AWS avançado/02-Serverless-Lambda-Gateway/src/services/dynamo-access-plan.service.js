import { DynamoTableModel } from "../models/dynamo-table.model.js";

export class DynamoAccessPlanService {
  constructor({ settings, tableSchema }) {
    this.settings = settings;
    this.tableSchema = new DynamoTableModel(tableSchema);
  }

  buildPlan() {
    const tableName = this.settings.tableName;

    return {
      table: this.tableSchema,
      createTableCommand: `aws dynamodb create-table --table-name ${tableName} --billing-mode ${this.tableSchema.billingMode} --attribute-definitions AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S AttributeName=gsi1pk,AttributeType=S AttributeName=gsi1sk,AttributeType=S --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE --global-secondary-indexes IndexName=gsi1-status-createdAt,KeySchema=[{AttributeName=gsi1pk,KeyType=HASH},{AttributeName=gsi1sk,KeyType=RANGE}],Projection={ProjectionType=ALL}`,
      queryPendingCommand: `aws dynamodb query --table-name ${tableName} --index-name gsi1-status-createdAt --key-condition-expression "gsi1pk = :status" --expression-attribute-values '{":status":{"S":"STATUS#PENDING"}}'`,
      seedRecords: [
        {
          pk: "ORDER#ord-100",
          sk: "ORDER#ord-100",
          status: "PENDING",
          total: 304.9
        },
        {
          pk: "ORDER#ord-101",
          sk: "ORDER#ord-101",
          status: "PAID",
          total: 159.0
        }
      ]
    };
  }
}
