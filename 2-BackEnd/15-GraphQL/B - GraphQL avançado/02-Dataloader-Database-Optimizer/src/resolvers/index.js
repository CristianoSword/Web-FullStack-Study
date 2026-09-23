export const resolvers = {
  Query: {
    posts: (_, { limit }, { database }) =>
      database.all(
        "SELECT id, title, author_id AS authorId FROM posts ORDER BY id ASC LIMIT ?",
        [limit]
      ),
    authors: (_, __, { database }) =>
      database.all("SELECT id, name, team FROM authors ORDER BY id ASC"),
    sqlStats: (_, __, { database }) => ({
      executedQueries: database.queryTracker.executedQueries,
      recentStatements: database.queryTracker.recentStatements
    })
  },
  Post: {
    author: (post, _, { loaders }) => loaders.authorById.load(post.authorId),
    metric: async (post, _, { loaders }) => {
      const metric = await loaders.metricByPostId.load(post.id);
      return {
        postId: metric.post_id,
        views: metric.views,
        likes: metric.likes
      };
    }
  }
};
