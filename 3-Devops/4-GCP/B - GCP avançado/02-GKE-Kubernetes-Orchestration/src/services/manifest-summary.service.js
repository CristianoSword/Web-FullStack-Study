import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ManifestCheckModel } from "../models/manifest-check.model.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");

const manifestDefinitions = [
  {
    file: "namespace.yaml",
    kind: "Namespace",
    purpose: "Isola os recursos da aplicacao dentro do cluster GKE.",
    tokens: ["kind: Namespace", "name: study-gke"]
  },
  {
    file: "configmap.yaml",
    kind: "ConfigMap",
    purpose: "Centraliza configuracoes nao sensiveis do workload.",
    tokens: ["kind: ConfigMap", "name: study-api-config"]
  },
  {
    file: "secret.yaml",
    kind: "Secret",
    purpose: "Armazena credenciais e segredos consumidos pelos pods.",
    tokens: ["kind: Secret", "name: study-api-secret"]
  },
  {
    file: "deployment.yaml",
    kind: "Deployment",
    purpose: "Gerencia replicas, probes e recursos do container principal.",
    tokens: ["kind: Deployment", "image: us-central1-docker.pkg.dev/study-platform-dev/study-registry/study-api:1.0.0"]
  },
  {
    file: "service.yaml",
    kind: "Service",
    purpose: "Expoe os pods internamente para o ingress.",
    tokens: ["kind: Service", "name: study-api-service"]
  },
  {
    file: "ingress.yaml",
    kind: "Ingress",
    purpose: "Publica a aplicacao com ingress controller GCE.",
    tokens: ["kind: Ingress", "host: study-api.example.com"]
  },
  {
    file: "hpa.yaml",
    kind: "HorizontalPodAutoscaler",
    purpose: "Escala o deployment conforme utilizacao de CPU.",
    tokens: ["kind: HorizontalPodAutoscaler", "averageUtilization: 65"]
  }
];

export class ManifestSummaryService {
  buildSummary() {
    return manifestDefinitions.map((definition) => {
      const absolutePath = path.resolve(root, "k8s", definition.file);
      const contents = fs.readFileSync(absolutePath, "utf8");
      const missingTokens = definition.tokens.filter((token) => !contents.includes(token));

      return new ManifestCheckModel({
        file: definition.file,
        kind: definition.kind,
        purpose: definition.purpose,
        tokens: missingTokens.length === 0 ? definition.tokens : [`missing: ${missingTokens.join(", ")}`]
      });
    });
  }
}
