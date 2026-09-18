import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";

import { serverConfig } from "./config/server-config.js";
import { queryResolvers } from "./resolvers/queryResolvers.js";
import { loadTypeDefs } from "./schema/loadSchema.js";

const typeDefs = await loadTypeDefs();

const yoga = createYoga({
  graphqlEndpoint: serverConfig.graphqlEndpoint,
  schema: {
    typeDefs,
    resolvers: {
      Query: queryResolvers
    }
  },
  landingPage: false
});

const server = createServer(yoga);

server.listen(serverConfig.port, () => {
  console.log(
    `${serverConfig.appName} listening on http://localhost:${serverConfig.port}${serverConfig.graphqlEndpoint}`
  );
});
