import * as analytics from "./analytics-client.js";

export async function markLessonReviewed(lesson) {
  const payload = analytics.formatEvent(lesson);
  return analytics.sendEvent(payload);
}
