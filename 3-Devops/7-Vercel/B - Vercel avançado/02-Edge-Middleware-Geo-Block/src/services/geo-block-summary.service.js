export function summarizeGeoBlockPlan(geoRules, middlewareProfile) {
  return {
    allowedCount: geoRules.allowedCountries.length,
    blockedCount: geoRules.blockedCountries.length,
    decisionHeader: middlewareProfile.decisionHeader
  };
}
