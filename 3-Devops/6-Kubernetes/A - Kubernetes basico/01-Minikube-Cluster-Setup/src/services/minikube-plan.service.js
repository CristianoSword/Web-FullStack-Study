import { AddonModel } from "../models/addon.model.js";
import { MinikubeProfileModel } from "../models/minikube-profile.model.js";

export class MinikubePlanService {
  constructor({ profile, addons }) {
    this.profile = new MinikubeProfileModel(profile);
    this.addons = addons.map((addon) => new AddonModel(addon));
  }

  buildPlan() {
    return {
      profile: this.profile,
      addons: this.addons,
      commands: {
        start: `minikube start --profile ${this.profile.profile} --driver=${this.profile.driver} --cpus=${this.profile.cpus} --memory=${this.profile.memoryMb} --kubernetes-version=${this.profile.kubernetesVersion} --container-runtime=${this.profile.containerRuntime}`,
        enableAddons: this.addons.map((addon) => `minikube addons enable ${addon.name} --profile ${this.profile.profile}`),
        apply: "kubectl apply -f k8s/namespace.yaml -f k8s/configmap.yaml -f k8s/deployment.yaml -f k8s/service.yaml"
      }
    };
  }
}
