import { createCredentialsPlan } from "../models/credentials-plan.model.js";

export class CredentialsPlanService {
  constructor({ config, credentialStorage, env = process.env }) {
    this.config = config;
    this.credentialStorage = credentialStorage;
    this.env = env;
  }

  buildPlan() {
    const userName = this.env.AWS_IAM_USER ?? this.config.userName;

    return createCredentialsPlan({
      userName,
      createKeyCommand: `aws iam create-access-key --user-name ${userName}`,
      rotationPolicyDays: this.credentialStorage.rotationPolicyDays,
      notes: this.credentialStorage.notes
    });
  }
}
