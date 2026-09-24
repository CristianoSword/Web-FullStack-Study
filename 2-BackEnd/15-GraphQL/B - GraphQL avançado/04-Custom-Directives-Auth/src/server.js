import { createServer } from "node:http";

import { createSchema, createYoga } from "graphql-yoga";

import { buildAuthContext } from "./auth/build-auth-context.js";
import { authDirectiveTransformer } from "./auth/auth-directive.js";
import { serverConfig } from "./config/server-config.js";
import { resolvers } from "./resolvers/index.js";
import { loadTypeDefs } from "./schema/loadSchema.js";

const typeDefs = await loadTypeDefs();

let schema = createSchema({
  typeDefs,
  resolvers
});

schema = authDirectiveTransformer(schema);

const yoga = createYoga({
  graphqlEndpoint: serverConfig.graphqlEndpoint,
  schema,
  landingPage: false,
  context: ({ request }) => buildAuthContext(request.headers)
});

const server = createServer(yoga);
const requestListener = server.listeners("request")[0];

server.removeAllListeners("request");
server.on("request", (req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok", app: serverConfig.appName }));
    return;
  }

  requestListener(req, res);
});

server.listen(serverConfig.port, () => {
  console.log(
    `${serverConfig.appName} listening on http://localhost:${serverConfig.port}${serverConfig.graphqlEndpoint}`
  );
});
