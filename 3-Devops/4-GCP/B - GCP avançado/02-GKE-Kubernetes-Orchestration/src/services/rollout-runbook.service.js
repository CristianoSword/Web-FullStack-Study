export class RolloutRunbookService {
  constructor({ clusterSpec, appSpec }) {
    this.clusterSpec = clusterSpec;
    this.appSpec = appSpec;
  }

  buildRunbook() {
    const { clusterSpec, appSpec } = this;

    return [
      {
        name: "build-image",
        command: `gcloud builds submit --tag ${appSpec.containerImage}`,
        purpose: "Compila e publica a imagem da aplicacao no Artifact Registry."
      },
      {
        name: "cluster-credentials",
        command: `gcloud container clusters get-credentials ${clusterSpec.clusterName} --region ${clusterSpec.region} --project ${clusterSpec.projectId}`,
        purpose: "Carrega o contexto kubectl do cluster GKE."
      },
      {
        name: "bootstrap-namespace",
        command: "kubectl apply -f k8s/namespace.yaml -f k8s/configmap.yaml -f k8s/secret.yaml",
        purpose: "Cria o namespace e injeta configuracoes iniciais."
      },
      {
        name: "deploy-workload",
        command: "kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml -f k8s/ingress.yaml -f k8s/hpa.yaml",
        purpose: "Publica o deployment, service, ingress e autoscaling."
      },
      {
        name: "rollout-status",
        command: `kubectl rollout status deployment/${appSpec.deploymentName} -n ${appSpec.namespace}`,
        purpose: "Confirma que a nova revisao ficou estavel."
      },
      {
        name: "smoke-test",
        command: `kubectl get ingress ${appSpec.ingressName} -n ${appSpec.namespace} && curl -k https://${appSpec.host}/health`,
        purpose: "Valida que o endpoint final responde apos o rollout."
      }
    ];
  }
}
