import { ConfigmapSpecModel } from "../models/configmap-spec.model.js";
import { EnvMappingModel } from "../models/env-mapping.model.js";

export class ConfigmapPlanService {
  constructor({ spec, mappings }) {
    this.configMap = new ConfigmapSpecModel(spec);
    this.mappings = mappings.map((mapping) => new EnvMappingModel(mapping));
  }

  buildPlan() {
    return {
      configMap: this.configMap,
      mappings: this.mappings,
      commands: {
        apply: "kubectl apply -f k8s/namespace.yaml -f k8s/configmap.yaml -f k8s/deployment.yaml -f k8s/service.yaml",
        describe: `kubectl describe configmap ${this.configMap.configMapName} -n ${this.configMap.namespace}`,
        inspectEnv: `kubectl exec -n ${this.configMap.namespace} <pod-name> -- printenv APP_NAME`
      }
    };
  }
}
