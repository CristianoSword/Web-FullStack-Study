export class LoadBalancerSpecModel {
  constructor({ name, region, sizeUnit, dropletTag, stickySessions, redirectHttpToHttps, enableProxyProtocol }) {
    this.name = name;
    this.region = region;
    this.sizeUnit = sizeUnit;
    this.dropletTag = dropletTag;
    this.stickySessions = stickySessions;
    this.redirectHttpToHttps = redirectHttpToHttps;
    this.enableProxyProtocol = enableProxyProtocol;
  }
}
