export function createEventStore(limit = 20) {
  const events = [];

  return {
    add(event) {
      events.unshift(event);

      if (events.length > limit) {
        events.length = limit;
      }
    },
    count() {
      return events.length;
    },
    all() {
      return [...events];
    },
    lastPublishedAt() {
      return events[0]?.publishedAt ?? null;
    }
  };
}
