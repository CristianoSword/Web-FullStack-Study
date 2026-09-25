import express from "express";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { ports } from "./config/ports.js";
import { accountsSubgraphSchema } from "./subgraphs/accounts-subgraph.js";
import { catalogSubgraphSchema } from "./subgraphs/catalog-subgraph.js";
import { reviewsSubgraphSchema } from "./subgraphs/reviews-subgraph.js";
import { startSubgraphServer } from "./start-subgraph-server.js";

await startSubgraphServer({
  name: "accounts-subgraph",
  port: ports.accounts,
  schema: accountsSubgraphSchema
});

await startSubgraphServer({
  name: "catalog-subgraph",
  port: ports.catalog,
  schema: catalogSubgraphSchema
});

await startSubgraphServer({
  name: "reviews-subgraph",
  port: ports.reviews,
  schema: reviewsSubgraphSchema
});

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "accounts", url: `http://localhost:${ports.accounts}/graphql` },
      { name: "catalog", url: `http://localhost:${ports.catalog}/graphql` },
      { name: "reviews", url: `http://localhost:${ports.reviews}/graphql` }
    ]
  })
});

const apolloServer = new ApolloServer({ gateway });
await apolloServer.start();

const app = express();
app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    gateway: ports.gateway,
    subgraphs: [ports.accounts, ports.catalog, ports.reviews]
  });
});

app.use("/graphql", expressMiddleware(apolloServer));

app.listen(ports.gateway, () => {
  console.log(`federated supergraph listening on http://localhost:${ports.gateway}/graphql`);
});
