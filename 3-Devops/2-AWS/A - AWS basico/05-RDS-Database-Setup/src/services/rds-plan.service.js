import { createRdsPlan } from "../models/rds-plan.model.js";

export class RdsPlanService {
  constructor({ config, networking, parameters, env = process.env }) {
    this.config = config;
    this.networking = networking;
    this.parameters = parameters;
    this.env = env;
  }

  buildPlan() {
    const instanceIdentifier = this.env.RDS_INSTANCE_ID ?? this.config.instanceIdentifier;
    const dbName = this.env.RDS_DB_NAME ?? "studyapp";
    const username = this.env.RDS_MASTER_USERNAME ?? "studyadmin";

    return createRdsPlan({
      instanceIdentifier,
      engine: this.config.engine,
      instanceClass: this.config.instanceClass,
      allocatedStorageGb: this.config.allocatedStorageGb,
      createCommand:
        `aws rds create-db-instance --db-instance-identifier ${instanceIdentifier} ` +
        `--engine ${this.config.engine} --engine-version ${this.config.engineVersion} ` +
        `--db-instance-class ${this.config.instanceClass} --allocated-storage ${this.config.allocatedStorageGb} ` +
        `--master-username ${username} --master-user-password <secure-password> --db-name ${dbName} ` +
        `--db-subnet-group-name ${this.networking.subnetGroup} --vpc-security-group-ids ${this.networking.securityGroup} ` +
        `--port ${this.config.defaultPort} --backup-retention-period ${this.parameters.backupRetentionPeriodDays}`,
      verificationCommands: this.config.verificationCommands
    });
  }
}
