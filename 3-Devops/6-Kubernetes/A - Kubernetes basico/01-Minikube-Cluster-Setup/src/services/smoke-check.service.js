export class SmokeCheckService {
  constructor({ profile }) {
    this.profile = profile;
  }

  buildPlan() {
    return [
      {
        name: "check-profile",
        command: `minikube profile list | findstr ${this.profile.profile}`,
        purpose: "Confirmar que o perfil local existe."
      },
      {
        name: "check-nodes",
        command: "kubectl get nodes",
        purpose: "Validar que o cluster esta acessivel."
      },
      {
        name: "check-rollout",
        command: "kubectl rollout status deployment/study-web -n study-local --timeout=90s",
        purpose: "Garantir que o deployment subiu corretamente."
      },
      {
        name: "open-service-url",
        command: `minikube service study-web-service -n study-local --url --profile ${this.profile.profile}`,
        purpose: "Obter a URL publica do NodePort para teste manual."
      }
    ];
  }
}
