export function buildCronPlan(cronSchedules, operationsPolicy) {
  return {
    jobs: cronSchedules.jobs,
    requiresAuthorization: operationsPolicy.requiresAuthorization,
    secretHeader: operationsPolicy.secretHeader,
    retentionDaysDefault: operationsPolicy.retentionDaysDefault
  };
}
