export class GreetingContextModel {
  constructor({ actor, eventName, refName, note }) {
    this.actor = actor;
    this.eventName = eventName;
    this.refName = refName;
    this.note = note;
  }
}
