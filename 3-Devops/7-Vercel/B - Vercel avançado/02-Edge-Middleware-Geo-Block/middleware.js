import { NextResponse } from "next/server";
import { evaluateGeoAccess } from "./lib/geo-policy.js";

export function middleware(request) {
  const country = request.geo?.country || request.headers.get("x-vercel-ip-country") || "unknown";
  const decision = evaluateGeoAccess(country, {
    allowedCountries: process.env.ALLOWED_COUNTRIES,
    blockedCountries: process.env.BLOCKED_COUNTRIES
  });

  if (!decision.allowed) {
    const blockedUrl = new URL("/blocked.html", request.url);
    const response = NextResponse.redirect(blockedUrl);
    response.headers.set("x-geo-decision", decision.reason);
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("x-geo-decision", decision.reason);
  return response;
}

export const config = {
  matcher: ["/((?!assets|blocked.html|favicon.ico).*)"]
};
