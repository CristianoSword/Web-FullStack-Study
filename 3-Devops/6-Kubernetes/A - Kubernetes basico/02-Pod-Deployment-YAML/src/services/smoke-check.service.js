export class SmokeCheckService {
  constructor({ workload }) {
    this.workload = workload;
  }

  buildPlan() {
    return [
      {
        name: "check-pod",
        command: `kubectl get pod ${this.workload.appName}-pod -n ${this.workload.namespace}`,
        purpose: "Inspecionar o pod standalone."
      },
      {
        name: "check-deployment-rollout",
        command: `kubectl rollout status deployment/${this.workload.appName}-deployment -n ${this.workload.namespace} --timeout=90s`,
        purpose: "Validar as replicas gerenciadas pelo deployment."
      },
      {
        name: "check-service",
        command: `kubectl get svc ${this.workload.appName}-service -n ${this.workload.namespace}`,
        purpose: "Verificar o Service e o NodePort."
      },
      {
        name: "open-service-url",
        command: `minikube service ${this.workload.appName}-service -n ${this.workload.namespace} --url`,
        purpose: "Abrir a URL do serviço no Minikube."
      }
    ];
  }
}
