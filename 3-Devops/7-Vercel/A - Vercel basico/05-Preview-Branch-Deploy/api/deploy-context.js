function resolveStage(environment, branch) {
  if (environment === "production" || branch === "main") {
    return "production";
  }

  return "preview";
}

export default function handler(_request, response) {
  const branch = process.env.VERCEL_GIT_COMMIT_REF || "local-preview";
  const environment = process.env.VERCEL_ENV || "preview";
  const url = process.env.VERCEL_URL || "localhost:3000";

  response.status(200).json({
    branch,
    environment,
    deploymentStage: resolveStage(environment, branch),
    url,
    source: "vercel-preview-branch"
  });
}
