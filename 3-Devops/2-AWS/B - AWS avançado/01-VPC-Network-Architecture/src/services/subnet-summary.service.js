import { createSubnetSummary } from "../models/subnet-summary.model.js";

export class SubnetSummaryService {
  constructor({ subnets }) {
    this.subnets = subnets;
  }

  buildSummary() {
    return createSubnetSummary({
      publicSubnets: this.subnets.public,
      privateSubnets: this.subnets.private
    });
  }
}
