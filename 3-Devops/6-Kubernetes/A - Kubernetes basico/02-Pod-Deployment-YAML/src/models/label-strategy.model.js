export class LabelStrategyModel {
  constructor({ app, tier, managedBy, selector }) {
    this.app = app;
    this.tier = tier;
    this.managedBy = managedBy;
    this.selector = selector;
  }
}
