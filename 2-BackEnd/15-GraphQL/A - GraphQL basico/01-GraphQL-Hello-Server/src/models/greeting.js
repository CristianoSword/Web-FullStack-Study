export function buildGreeting(name) {
  return {
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    source: "graphql-hello-server"
  };
}
