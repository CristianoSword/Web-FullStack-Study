export function summarizeIngress(ingressSpec) {
  return {
    namespace: ingressSpec.namespace,
    host: ingressSpec.host,
    ingressClassName: ingressSpec.ingressClassName,
    routeCount: ingressSpec.routes.length
  };
}
