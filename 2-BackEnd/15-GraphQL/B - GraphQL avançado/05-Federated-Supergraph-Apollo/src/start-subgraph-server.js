import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

export async function startSubgraphServer({ name, port, schema }) {
  const server = new ApolloServer({ schema });
  await server.start();

  const app = express();
  app.use(express.json());

  app.get("/health", (_, res) => {
    res.status(200).json({ status: "ok", service: name });
  });

  app.use("/graphql", expressMiddleware(server));

  return new Promise((resolve) => {
    const httpServer = app.listen(port, () => {
      resolve(httpServer);
    });
  });
}
