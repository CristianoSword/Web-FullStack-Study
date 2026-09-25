import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { products } from "../models/products.js";

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    sku: String!
    title: String!
    seller: User!
  }

  type User @key(fields: "id") {
    id: ID!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`;

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find((product) => product.id === id) ?? null
  },
  Product: {
    seller: (product) => ({ __typename: "User", id: product.sellerId }),
    __resolveReference: (reference) =>
      products.find((product) => product.id === reference.id) ?? null
  }
};

export const catalogSubgraphSchema = buildSubgraphSchema([{ typeDefs, resolvers }]);
