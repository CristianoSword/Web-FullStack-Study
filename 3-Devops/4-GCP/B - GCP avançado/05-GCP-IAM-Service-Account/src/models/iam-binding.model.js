export class IamBindingModel {
  constructor({ resource, member, role }) {
    this.resource = resource;
    this.member = member;
    this.role = role;
  }
}
