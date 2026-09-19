import { posts } from "../models/posts.js";
import { users } from "../models/users.js";

function filterPosts({ authorId, published }) {
  return posts.filter((post) => {
    const authorMatches = authorId ? post.authorId === authorId : true;
    const publishedMatches =
      typeof published === "boolean" ? post.published === published : true;

    return authorMatches && publishedMatches;
  });
}

export const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id) ?? null,
    posts: (_, args) => filterPosts(args),
    post: (_, { id }) => posts.find((post) => post.id === id) ?? null
  },
  User: {
    posts: (user) => posts.filter((post) => post.authorId === user.id)
  },
  Post: {
    author: (post) => users.find((user) => user.id === post.authorId)
  }
};
