export function createStorageChecks() {
  return [
    "statefulset-rollout",
    "claim-bound",
    "volume-mounted",
    "file-present",
    "headless-service-ready"
  ];
}
