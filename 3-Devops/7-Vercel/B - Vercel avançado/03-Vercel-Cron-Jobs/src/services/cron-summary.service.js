export function summarizeCronPlan(cronSchedules, operationsPolicy) {
  return {
    jobCount: cronSchedules.jobs.length,
    requiresAuthorization: operationsPolicy.requiresAuthorization,
    retentionDaysDefault: operationsPolicy.retentionDaysDefault
  };
}
