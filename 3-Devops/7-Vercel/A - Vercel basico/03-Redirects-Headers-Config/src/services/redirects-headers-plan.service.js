export function buildRedirectsHeadersPlan(headersPolicy, redirectRules) {
  return {
    rules: redirectRules.rules,
    globalHeaders: headersPolicy.globalHeaders,
    assetHeaders: headersPolicy.assetHeaders
  };
}
