export class EventMap {
  constructor({ events }) {
    this.events = events;
  }

  static from(raw) {
    return new EventMap(raw);
  }
}
