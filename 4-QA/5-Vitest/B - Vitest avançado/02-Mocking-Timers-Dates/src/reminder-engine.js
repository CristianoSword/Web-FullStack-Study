function scheduleReminder(callback, delayMs) {
  return setTimeout(callback, delayMs);
}

function isReviewWindowOpen(now, reviewHour) {
  return now.getHours() >= reviewHour;
}

module.exports = { scheduleReminder, isReviewWindowOpen };
