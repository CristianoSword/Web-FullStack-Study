import { ManifestCheckModel } from "../models/manifest-check.model.js";

export class ManifestSummaryService {
  buildSummary() {
    return [
      new ManifestCheckModel({
        file: "namespace.yaml",
        kind: "Namespace",
        purpose: "Separar o ambiente do estudo em um namespace dedicado."
      }),
      new ManifestCheckModel({
        file: "pod.yaml",
        kind: "Pod",
        purpose: "Mostrar a definicao minima de um pod standalone."
      }),
      new ManifestCheckModel({
        file: "deployment.yaml",
        kind: "Deployment",
        purpose: "Gerenciar replicas e rollout de forma declarativa."
      }),
      new ManifestCheckModel({
        file: "service.yaml",
        kind: "Service",
        purpose: "Expor os pods selecionados pelo label app=study-nginx."
      })
    ];
  }
}
