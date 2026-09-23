import { createServer } from "node:http";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { createSchema, createYoga } from "graphql-yoga";

import { serverConfig } from "./config/server-config.js";
import { loadTypeDefs } from "./schema/loadSchema.js";
import { resolvers } from "./resolvers/index.js";

const typeDefs = await loadTypeDefs();
const schema = createSchema({ typeDefs, resolvers });

const yoga = createYoga({
  graphqlEndpoint: serverConfig.graphqlEndpoint,
  schema,
  landingPage: false
});

const httpServer = createServer(yoga);
const requestListener = httpServer.listeners("request")[0];

httpServer.removeAllListeners("request");
httpServer.on("request", (req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok", app: serverConfig.appName }));
    return;
  }

  requestListener(req, res);
});

const wsServer = new WebSocketServer({
  server: httpServer,
  path: serverConfig.wsPath
});

useServer({ schema }, wsServer);

httpServer.listen(serverConfig.port, () => {
  console.log(
    `${serverConfig.appName} listening on http://localhost:${serverConfig.port}${serverConfig.graphqlEndpoint}`
  );
});
