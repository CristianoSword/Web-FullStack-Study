export function summarizeRedirectsHeaders(headersPolicy, redirectRules) {
  return {
    redirectCount: redirectRules.rules.length,
    globalHeaderCount: headersPolicy.globalHeaders.length,
    assetHeaderCount: headersPolicy.assetHeaders.length
  };
}
