function parseCountryList(rawValue, fallback) {
  return (rawValue || fallback)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function evaluateGeoAccess(country, options = {}) {
  const allowedCountries = parseCountryList(options.allowedCountries, "BR,US,CA");
  const blockedCountries = parseCountryList(options.blockedCountries, "KP,IR");

  if (blockedCountries.includes(country)) {
    return {
      allowed: false,
      reason: `blocked-country:${country}`
    };
  }

  if (!allowedCountries.includes(country)) {
    return {
      allowed: false,
      reason: `outside-allowlist:${country}`
    };
  }

  return {
    allowed: true,
    reason: `allowed-country:${country}`
  };
}
