export class IngressSpec {
  constructor({ namespace, host, ingressClassName, tlsSecretName, routes }) {
    this.namespace = namespace;
    this.host = host;
    this.ingressClassName = ingressClassName;
    this.tlsSecretName = tlsSecretName;
    this.routes = routes;
  }

  static from(raw) {
    return new IngressSpec(raw);
  }
}
