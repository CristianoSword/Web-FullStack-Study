export class RolloutRunbookService {
  constructor({ appSpec }) {
    this.appSpec = appSpec;
  }

  buildRunbook() {
    return [
      {
        name: "build-and-push-image",
        command: "docker build -t registry.digitalocean.com/study-registry/study-api:latest . && docker push registry.digitalocean.com/study-registry/study-api:latest",
        purpose: "Publish the container image consumed by the deployment."
      },
      {
        name: "apply-manifests",
        command: "kubectl apply -f k8s/",
        purpose: "Create or update namespace, config, deployment, service, ingress and HPA."
      },
      {
        name: "watch-rollout",
        command: `kubectl rollout status deployment/${this.appSpec.deploymentName} -n ${this.appSpec.namespace}`,
        purpose: "Wait until the new ReplicaSet is healthy."
      },
      {
        name: "verify-traffic",
        command: `kubectl get ingress -n ${this.appSpec.namespace} && curl -I https://${this.appSpec.ingressHost}/health`,
        purpose: "Confirm ingress exposure and application health."
      }
    ];
  }
}
