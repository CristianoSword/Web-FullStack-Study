export function buildDailyReport() {
  return {
    task: "daily-report",
    generatedAt: "2026-07-01T00:00:00.000Z",
    metrics: {
      completedLessons: 28,
      openTracks: 4,
      activeStreak: 12
    }
  };
}

export function buildPreviewCleanupPlan(retentionDays) {
  return {
    task: "cleanup-previews",
    retentionDays,
    targets: [
      "preview-branch-auth-flow",
      "preview-branch-dashboard-fix",
      "preview-branch-search-refactor"
    ]
  };
}
