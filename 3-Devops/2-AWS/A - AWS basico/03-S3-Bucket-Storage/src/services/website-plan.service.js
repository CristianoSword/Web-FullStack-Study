import { createWebsitePlan } from "../models/website-plan.model.js";

export class WebsitePlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const bucketName = this.env.AWS_BUCKET_NAME ?? this.config.bucketName;
    const region = this.env.AWS_REGION ?? this.config.region;

    return createWebsitePlan({
      bucketName,
      indexDocument: this.config.websiteIndexDocument,
      enableWebsiteCommand: `aws s3 website s3://${bucketName} --index-document ${this.config.websiteIndexDocument}`,
      endpoint: `http://${bucketName}.s3-website-${region}.amazonaws.com`
    });
  }
}
