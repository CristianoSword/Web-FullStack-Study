export class ActionContractModel {
  constructor({ name, displayName, main, inputs, outputs }) {
    this.name = name;
    this.displayName = displayName;
    this.main = main;
    this.inputs = inputs;
    this.outputs = outputs;
  }
}
