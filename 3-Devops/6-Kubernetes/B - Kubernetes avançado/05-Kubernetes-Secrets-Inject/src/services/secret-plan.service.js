export function buildSecretPlan(secretSpec, accessPolicy) {
  return {
    namespace: secretSpec.namespace,
    secretName: secretSpec.secretName,
    envKeys: accessPolicy.envKeys,
    fileKeys: accessPolicy.fileKeys,
    mountPath: accessPolicy.mountPath,
    configKeys: accessPolicy.nonSensitiveConfigKeys
  };
}
