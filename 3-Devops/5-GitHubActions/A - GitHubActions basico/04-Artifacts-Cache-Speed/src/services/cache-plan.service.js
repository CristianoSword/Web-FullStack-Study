import { CacheDefinitionModel } from "../models/cache-definition.model.js";

export class CachePlanService {
  constructor({ spec }) {
    this.cache = new CacheDefinitionModel(spec);
    this.spec = spec;
  }

  buildPlan() {
    return {
      nodeVersion: this.cache.nodeVersion,
      cachePath: this.cache.cachePath,
      cacheKeyPrefix: this.cache.cacheKeyPrefix,
      steps: ["checkout", "setup-node", "restore-cache", "create-build-report", "upload-artifact", "download-artifact"]
    };
  }
}
