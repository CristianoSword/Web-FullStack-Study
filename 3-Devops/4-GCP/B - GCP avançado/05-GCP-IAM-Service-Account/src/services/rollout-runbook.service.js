export class RolloutRunbookService {
  constructor({ serviceAccountSpec, iamBindings, workloadIdentityBinding }) {
    this.serviceAccountSpec = serviceAccountSpec;
    this.iamBindings = iamBindings;
    this.workloadIdentityBinding = workloadIdentityBinding;
  }

  buildRunbook() {
    return [
      {
        name: "create-service-account",
        command: `gcloud iam service-accounts create ${this.serviceAccountSpec.accountId} --display-name "${this.serviceAccountSpec.displayName}" --project ${this.serviceAccountSpec.projectId}`,
        purpose: "Cria a identidade principal do workload."
      },
      {
        name: "grant-project-roles",
        command: `gcloud projects add-iam-policy-binding ${this.serviceAccountSpec.projectId} --member="serviceAccount:${this.serviceAccountSpec.email}" --role="roles/logging.logWriter"`,
        purpose: "Aplica as roles de projeto necessarias para logs e metricas."
      },
      {
        name: "grant-resource-access",
        command: `gcloud storage buckets add-iam-policy-binding gs://${this.serviceAccountSpec.targetBucket} --member="serviceAccount:${this.serviceAccountSpec.email}" --role="roles/storage.objectViewer"`,
        purpose: "Permite leitura do bucket privado pelo app."
      },
      {
        name: "bind-workload-identity",
        command: `gcloud iam service-accounts add-iam-policy-binding ${this.serviceAccountSpec.email} --role="${this.workloadIdentityBinding.role}" --member="${this.workloadIdentityBinding.member}"`,
        purpose: "Conecta a KSA do GKE a conta Google via Workload Identity."
      },
      {
        name: "verify-access",
        command: "node client/access-bucket.js",
        purpose: "Confirma que a autenticacao do cliente Node esta funcional."
      }
    ];
  }
}
