import { BucketSpecModel } from "../models/bucket-spec.model.js";

export class BucketPlanService {
  constructor({ bucketSpec }) {
    this.bucketSpec = new BucketSpecModel(bucketSpec);
  }

  buildPlan() {
    return {
      bucket: this.bucketSpec,
      createCommand: `gcloud storage buckets create gs://${this.bucketSpec.bucketName} --location=${this.bucketSpec.location} --default-storage-class=${this.bucketSpec.storageClass} --project=${this.bucketSpec.projectId}`,
      postCreateSteps: [
        "Apply lifecycle policy",
        "Apply CORS configuration",
        "Upload static assets",
        "Validate public object access"
      ]
    };
  }
}
