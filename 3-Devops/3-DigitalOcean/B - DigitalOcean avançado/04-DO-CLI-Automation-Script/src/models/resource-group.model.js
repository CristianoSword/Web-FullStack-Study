export class ResourceGroupModel {
  constructor({ projectName, region, vpcName, droplets, firewallName, loadBalancerName }) {
    this.projectName = projectName;
    this.region = region;
    this.vpcName = vpcName;
    this.droplets = droplets;
    this.firewallName = firewallName;
    this.loadBalancerName = loadBalancerName;
  }
}
