export function formatEvent(lesson) {
  return {
    name: "lesson.reviewed",
    lessonId: lesson.lessonId,
    title: lesson.title
  };
}

export async function sendEvent(payload) {
  return {
    delivered: true,
    payload
  };
}
