export class AutoScalingGroupModel {
  constructor({ autoScalingGroupName, launchTemplateName, desiredCapacity, minSize, maxSize, privateSubnets }) {
    this.autoScalingGroupName = autoScalingGroupName;
    this.launchTemplateName = launchTemplateName;
    this.desiredCapacity = desiredCapacity;
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.privateSubnets = privateSubnets;
  }
}
