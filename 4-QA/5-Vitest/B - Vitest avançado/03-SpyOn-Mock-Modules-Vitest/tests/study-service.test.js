import { beforeEach, describe, expect, it, vi } from "vitest";
import { lessonEvent } from "../src/models/lesson-event.js";
import * as analytics from "../src/analytics-client.js";
import { markLessonReviewed } from "../src/study-service.js";

vi.mock("../src/analytics-client.js", async () => {
  const actual = await vi.importActual("../src/analytics-client.js");
  return {
    ...actual,
    sendEvent: vi.fn(async (payload) => ({
      delivered: true,
      payload,
      mocked: true
    }))
  };
});

describe("markLessonReviewed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("espiona o formatEvent e mocka o envio externo", async () => {
    const formatterSpy = vi.spyOn(analytics, "formatEvent");
    const result = await markLessonReviewed(lessonEvent);

    expect(formatterSpy).toHaveBeenCalledWith(lessonEvent);
    expect(analytics.sendEvent).toHaveBeenCalledOnce();
    expect(result.mocked).toBe(true);
    expect(result.payload.lessonId).toBe("queue-01");
  });
});
