export function createSecretChecks() {
  return [
    "rollout-ready",
    "env-secret-injected",
    "file-secret-mounted",
    "configmap-still-separate",
    "secret-describe-reviewed"
  ];
}
