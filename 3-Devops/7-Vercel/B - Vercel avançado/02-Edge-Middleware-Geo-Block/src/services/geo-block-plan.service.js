export function buildGeoBlockPlan(geoRules, middlewareProfile) {
  return {
    allowedCountries: geoRules.allowedCountries,
    blockedCountries: geoRules.blockedCountries,
    matcher: middlewareProfile.matcher,
    blockedPage: middlewareProfile.blockedPage,
    decisionHeader: middlewareProfile.decisionHeader
  };
}
