import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { serverConfig } from "./config/server-config.js";
import { createDatabase } from "./database/create-database.js";
import { createLoaders } from "./loaders/create-loaders.js";
import { resolvers } from "./resolvers/index.js";
import { loadTypeDefs } from "./schema/loadSchema.js";

const [typeDefs, database] = await Promise.all([loadTypeDefs(), createDatabase()]);

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
  expressMiddleware(apolloServer, {
    context: async () => ({
      database,
      loaders: createLoaders(database)
    })
  })
);

app.listen(serverConfig.port, () => {
  console.log(
    `${serverConfig.appName} listening on http://localhost:${serverConfig.port}${serverConfig.graphqlEndpoint}`
  );
});
