import { ManifestCheckModel } from "../models/manifest-check.model.js";

export class ManifestSummaryService {
  buildSummary() {
    return [
      new ManifestCheckModel({
        file: "namespace.yaml",
        kind: "Namespace",
        purpose: "Isolar os recursos do estudo dentro do cluster local."
      }),
      new ManifestCheckModel({
        file: "configmap.yaml",
        kind: "ConfigMap",
        purpose: "Injetar configuracoes basicas na aplicacao."
      }),
      new ManifestCheckModel({
        file: "deployment.yaml",
        kind: "Deployment",
        purpose: "Executar o container nginx com probes e limites de recursos."
      }),
      new ManifestCheckModel({
        file: "service.yaml",
        kind: "Service",
        purpose: "Expor a aplicacao via NodePort no Minikube."
      })
    ];
  }
}
