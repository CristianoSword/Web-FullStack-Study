import { ConfigmapSpecModel } from "../models/configmap-spec.model.js";
import { EnvMappingModel } from "../models/env-mapping.model.js";

export class ConfigmapSummaryService {
  constructor({ spec, mappings }) {
    this.configMap = new ConfigmapSpecModel(spec);
    this.mappings = mappings.map((mapping) => new EnvMappingModel(mapping));
  }

  buildSummary() {
    return {
      namespace: this.configMap.namespace,
      configMapName: this.configMap.configMapName,
      keys: Object.keys(this.configMap.data),
      exposedEnvVars: this.mappings.map((mapping) => mapping.envName)
    };
  }
}
