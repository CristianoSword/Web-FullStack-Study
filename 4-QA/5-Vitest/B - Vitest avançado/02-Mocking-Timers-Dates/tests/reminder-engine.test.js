const { afterEach, describe, expect, it, vi } = require("vitest");
const { reminderRules } = require("../src/models/reminder-rules");
const { isReviewWindowOpen, scheduleReminder } = require("../src/reminder-engine");

describe("reminder engine", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("avança cronômetros virtuais", () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    scheduleReminder(callback, reminderRules.delayMs);
    vi.advanceTimersByTime(reminderRules.delayMs);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("controla a data atual com relógio falso", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-01T20:00:00"));

    expect(isReviewWindowOpen(new Date(), reminderRules.reviewHour)).toBe(true);
  });
});
