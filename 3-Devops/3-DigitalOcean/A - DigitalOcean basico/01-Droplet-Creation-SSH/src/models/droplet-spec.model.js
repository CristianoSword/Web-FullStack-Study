export class DropletSpecModel {
  constructor({ name, region, size, image, ipv6, monitoring, backups, tags }) {
    this.name = name;
    this.region = region;
    this.size = size;
    this.image = image;
    this.ipv6 = ipv6;
    this.monitoring = monitoring;
    this.backups = backups;
    this.tags = tags ?? [];
  }
}
