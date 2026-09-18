import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

import { serverConfig } from "./config/server-config.js";
import { queryResolvers } from "./resolvers/queryResolvers.js";
import { loadTypeDefs } from "./schema/loadSchema.js";

const typeDefs = await loadTypeDefs();

const yoga = createYoga({
  graphqlEndpoint: serverConfig.graphqlEndpoint,
  schema: createSchema({
    typeDefs,
    resolvers: {
      Query: queryResolvers
    }
  }),
  landingPage: false
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
