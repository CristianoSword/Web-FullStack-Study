import DataLoader from "dataloader";

export function createLoaders(database) {
  return {
    authorById: new DataLoader(async (ids) => {
      const placeholders = ids.map(() => "?").join(", ");
      const rows = database.all(
        `SELECT id, name, team FROM authors WHERE id IN (${placeholders})`,
        ids
      );
      const rowMap = new Map(rows.map((row) => [row.id, row]));
      return ids.map((id) => rowMap.get(id) ?? null);
    }),
    metricByPostId: new DataLoader(async (postIds) => {
      const placeholders = postIds.map(() => "?").join(", ");
      const rows = database.all(
        `SELECT post_id, views, likes FROM post_metrics WHERE post_id IN (${placeholders})`,
        postIds
      );
      const rowMap = new Map(rows.map((row) => [row.post_id, row]));
      return postIds.map((postId) => rowMap.get(postId) ?? null);
    })
  };
}
