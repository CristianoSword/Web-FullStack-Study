export function ensureCronAuthorized(request, cronSecret) {
  const authorization = request.headers?.authorization || request.headers?.Authorization;
  return authorization === `Bearer ${cronSecret}`;
}
