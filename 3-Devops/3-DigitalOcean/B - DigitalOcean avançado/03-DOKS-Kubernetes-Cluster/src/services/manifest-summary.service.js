import { ManifestCheckModel } from "../models/manifest-check.model.js";

export class ManifestSummaryService {
  buildSummary() {
    return [
      new ManifestCheckModel({ file: "k8s/namespace.yaml", purpose: "Isolate workload resources inside the study namespace." }),
      new ManifestCheckModel({ file: "k8s/deployment.yaml", purpose: "Run the application with probes and resource limits." }),
      new ManifestCheckModel({ file: "k8s/service.yaml", purpose: "Expose the pods internally on port 80." }),
      new ManifestCheckModel({ file: "k8s/ingress.yaml", purpose: "Publish the service through an ingress controller." }),
      new ManifestCheckModel({ file: "k8s/hpa.yaml", purpose: "Autoscale pods based on CPU utilization." })
    ];
  }
}
