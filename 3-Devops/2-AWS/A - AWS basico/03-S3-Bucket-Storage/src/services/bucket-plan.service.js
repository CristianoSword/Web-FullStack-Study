import { createBucketPlan } from "../models/bucket-plan.model.js";

export class BucketPlanService {
  constructor({ config, manifest, env = process.env }) {
    this.config = config;
    this.manifest = manifest;
    this.env = env;
  }

  buildPlan() {
    const bucketName = this.env.AWS_BUCKET_NAME ?? this.config.bucketName;
    const region = this.env.AWS_REGION ?? this.config.region;

    return createBucketPlan({
      bucketName,
      region,
      createBucketCommand: `aws s3api create-bucket --bucket ${bucketName} --region ${region}`,
      uploadCommands: this.manifest.objects.map(
        (object) => `aws s3 cp ${object.source} s3://${bucketName}/${object.key} --content-type ${object.contentType}`
      ),
      verificationCommands: this.config.verificationCommands
    });
  }
}
