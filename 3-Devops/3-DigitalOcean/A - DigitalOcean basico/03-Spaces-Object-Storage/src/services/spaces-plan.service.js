import { SpacesBucketModel } from "../models/spaces-bucket.model.js";

export class SpacesPlanService {
  constructor({ settings }) {
    this.settings = new SpacesBucketModel(settings);
  }

  buildPlan() {
    return {
      provider: "DigitalOcean Spaces",
      bucket: this.settings,
      createBucketCommand: `aws --endpoint-url ${this.settings.endpoint} s3 mb s3://${this.settings.bucketName}`,
      postCreateSteps: [
        "Apply CORS rules",
        "Apply public-read policy for /public",
        "Upload sample assets",
        "Verify CDN reachability"
      ]
    };
  }
}
