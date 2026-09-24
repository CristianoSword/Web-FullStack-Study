import { tokenStore } from "../models/tokens.js";

export function buildAuthContext(headers) {
  const authorization = headers.get("authorization") ?? "";
  const bearerToken = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : null;
  const fallbackToken = headers.get("x-user-token");
  const token = bearerToken || fallbackToken || null;

  return {
    token,
    currentUser: token ? tokenStore[token] ?? null : null
  };
}
