import { createConnectionPlan } from "../models/rds-connection.model.js";

export class RdsConnectionService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const database = this.env.RDS_DB_NAME ?? "studyapp";
    const username = this.env.RDS_MASTER_USERNAME ?? "studyadmin";

    return createConnectionPlan({
      endpointPlaceholder: "<rds-endpoint>",
      port: this.config.defaultPort,
      database,
      username,
      mysqlCommand: `mysql -h <rds-endpoint> -P ${this.config.defaultPort} -u ${username} -p ${database}`
    });
  }
}
