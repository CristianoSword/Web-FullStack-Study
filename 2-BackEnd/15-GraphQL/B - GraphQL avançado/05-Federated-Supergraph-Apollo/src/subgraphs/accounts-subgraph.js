import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { accounts } from "../models/accounts.js";

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    team: String!
  }

  type Query {
    users: [User!]!
  }
`;

const resolvers = {
  Query: {
    users: () => accounts
  },
  User: {
    __resolveReference: (reference) =>
      accounts.find((account) => account.id === reference.id) ?? null
  }
};

export const accountsSubgraphSchema = buildSubgraphSchema([{ typeDefs, resolvers }]);
