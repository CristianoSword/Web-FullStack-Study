function mask(value) {
  if (!value) {
    return "missing";
  }

  if (value.length <= 4) {
    return "****";
  }

  return `${value.slice(0, 2)}****${value.slice(-2)}`;
}

export default function handler(_request, response) {
  response.status(200).json({
    appName: process.env.NEXT_PUBLIC_APP_NAME || "Study Dashboard",
    stage: process.env.NEXT_PUBLIC_STAGE || "local",
    apiBaseUrl: process.env.API_BASE_URL || "http://localhost:4000",
    internalToken: mask(process.env.INTERNAL_API_TOKEN),
    source: "vercel-project-variables"
  });
}
