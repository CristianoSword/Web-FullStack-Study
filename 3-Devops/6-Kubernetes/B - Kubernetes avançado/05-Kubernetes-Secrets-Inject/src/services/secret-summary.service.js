export function summarizeSecretInjection(secretSpec, accessPolicy) {
  return {
    secretName: secretSpec.secretName,
    namespace: secretSpec.namespace,
    mountPath: accessPolicy.mountPath,
    keyCount: secretSpec.keys.length
  };
}
