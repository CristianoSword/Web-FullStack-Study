export function buildRoutingPlan(ingressSpec, smokePlan) {
  return {
    namespace: ingressSpec.namespace,
    host: ingressSpec.host,
    ingressClassName: ingressSpec.ingressClassName,
    tls: {
      secretName: ingressSpec.tlsSecretName
    },
    routes: ingressSpec.routes,
    smokeChecks: smokePlan.checks
  };
}
