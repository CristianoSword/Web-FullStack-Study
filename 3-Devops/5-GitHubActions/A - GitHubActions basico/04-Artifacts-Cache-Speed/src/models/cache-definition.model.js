export class CacheDefinitionModel {
  constructor({ cachePath, cacheKeyPrefix, nodeVersion }) {
    this.cachePath = cachePath;
    this.cacheKeyPrefix = cacheKeyPrefix;
    this.nodeVersion = nodeVersion;
  }
}
