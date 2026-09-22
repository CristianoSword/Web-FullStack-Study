import { authors } from "../models/authors.js";
import { posts } from "../models/posts.js";

export const resolvers = {
  Query: {
    authors: () => authors,
    author: (_, { id }) => authors.find((author) => author.id === id) ?? null,
    postsByTeam: async (_, { team }, { loaders }) => {
      const teamAuthors = authors.filter((author) => author.team === team);
      const postGroups = await Promise.all(
        teamAuthors.map((author) => loaders.postsByAuthorId.load(author.id))
      );

      return postGroups.flat();
    }
  },
  Author: {
    posts: (author, _, { loaders }) => loaders.postsByAuthorId.load(author.id)
  },
  Post: {
    author: (post, _, { loaders }) => loaders.authorById.load(post.authorId),
    comments: (post, _, { loaders }) => loaders.commentsByPostId.load(post.id)
  }
};
