import { posts } from "../models/posts.js";
import { users } from "../models/users.js";

export const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
    user: (_, { id }) => users.find((user) => user.id === id) ?? null
  },
  User: {
    posts: (user) => posts.filter((post) => post.authorId === user.id)
  },
  Post: {
    author: (post) => users.find((user) => user.id === post.authorId)
  }
};
