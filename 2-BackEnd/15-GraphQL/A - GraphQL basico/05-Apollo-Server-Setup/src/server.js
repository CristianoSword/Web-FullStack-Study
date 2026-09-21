import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { serverConfig } from "./config/server-config.js";
import { resolvers } from "./resolvers/index.js";
import { loadTypeDefs } from "./schema/loadSchema.js";

const typeDefs = await loadTypeDefs();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

await apolloServer.start();

const app = express();
app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok", app: serverConfig.appName });
});

app.use(
  serverConfig.graphqlEndpoint,
  expressMiddleware(apolloServer)
);

app.listen(serverConfig.port, () => {
  console.log(
    `${serverConfig.appName} listening on http://localhost:${serverConfig.port}${serverConfig.graphqlEndpoint}`
  );
});
