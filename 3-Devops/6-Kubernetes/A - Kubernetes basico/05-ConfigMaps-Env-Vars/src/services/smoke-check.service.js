import { ConfigmapSpecModel } from "../models/configmap-spec.model.js";

export class SmokeCheckService {
  constructor({ spec }) {
    this.configMap = new ConfigmapSpecModel(spec);
  }

  buildPlan() {
    return [
      {
        name: "rollout",
        command: `kubectl rollout status deployment/${this.configMap.deploymentName} -n ${this.configMap.namespace} --timeout=90s`,
        purpose: "Garantir que o deployment com o ConfigMap subiu corretamente."
      },
      {
        name: "inspect-app-name",
        command: `kubectl exec -n ${this.configMap.namespace} <pod-name> -- printenv APP_NAME`,
        purpose: "Validar a injeção da variável principal."
      },
      {
        name: "inspect-welcome-message",
        command: `kubectl exec -n ${this.configMap.namespace} <pod-name> -- printenv EXPLICIT_WELCOME_MESSAGE`,
        purpose: "Confirmar o mapeamento explícito via configMapKeyRef."
      },
      {
        name: "inspect-configmap",
        command: `kubectl describe configmap ${this.configMap.configMapName} -n ${this.configMap.namespace}`,
        purpose: "Inspecionar os dados do ConfigMap criado."
      }
    ];
  }
}
