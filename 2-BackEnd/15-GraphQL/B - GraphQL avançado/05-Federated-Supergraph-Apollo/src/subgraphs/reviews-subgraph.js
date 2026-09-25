import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { reviews } from "../models/reviews.js";

const typeDefs = gql`
  type Review {
    id: ID!
    rating: Int!
    body: String!
    author: User!
  }

  type User @key(fields: "id") {
    id: ID!
    reviews: [Review!]!
  }

  type Product @key(fields: "id") {
    id: ID!
    reviews: [Review!]!
  }

  type Query {
    reviewFeed: [Review!]!
  }
`;

const resolvers = {
  Query: {
    reviewFeed: () => reviews
  },
  Review: {
    author: (review) => ({ __typename: "User", id: review.authorId })
  },
  User: {
    reviews: (user) => reviews.filter((review) => review.authorId === user.id)
  },
  Product: {
    reviews: (product) => reviews.filter((review) => review.productId === product.id)
  }
};

export const reviewsSubgraphSchema = buildSubgraphSchema([{ typeDefs, resolvers }]);
