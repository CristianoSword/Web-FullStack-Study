export class RolloutRunbookService {
  constructor({ functionSpec, triggerSpec }) {
    this.functionSpec = functionSpec;
    this.triggerSpec = triggerSpec;
  }

  buildRunbook() {
    return [
      {
        name: "prepare-bucket",
        command: `gcloud storage buckets create gs://${this.triggerSpec.bucket} --location=${this.functionSpec.region}`,
        purpose: "Garante que o bucket observado pela funcao exista."
      },
      {
        name: "deploy-function",
        command: `gcloud functions deploy ${this.functionSpec.functionName} --gen2 --runtime ${this.functionSpec.runtime} --region ${this.functionSpec.region} --source function --entry-point ${this.functionSpec.entryPoint} --trigger-event-filters=type=${this.triggerSpec.eventType} --trigger-event-filters=bucket=${this.triggerSpec.bucket}`,
        purpose: "Publica a Cloud Function Gen2 com trigger do Storage."
      },
      {
        name: "upload-test-object",
        command: `gcloud storage cp ./samples/test-image.png gs://${this.triggerSpec.bucket}/images/test-image.png`,
        purpose: "Dispara o evento finalized com um upload de teste."
      },
      {
        name: "describe-function",
        command: `gcloud functions describe ${this.functionSpec.functionName} --gen2 --region ${this.functionSpec.region}`,
        purpose: "Confirma configuracoes, URL e status operacional."
      },
      {
        name: "inspect-logs",
        command: `gcloud functions logs read ${this.functionSpec.functionName} --gen2 --region ${this.functionSpec.region} --limit 20`,
        purpose: "Valida que o evento foi recebido e processado."
      }
    ];
  }
}
