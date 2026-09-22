import DataLoader from "dataloader";

import { authors } from "../models/authors.js";
import { comments } from "../models/comments.js";
import { posts } from "../models/posts.js";

export function createLoaders() {
  return {
    authorById: new DataLoader(async (ids) =>
      ids.map((id) => authors.find((author) => author.id === id) ?? null)
    ),
    postsByAuthorId: new DataLoader(async (authorIds) =>
      authorIds.map((authorId) => posts.filter((post) => post.authorId === authorId))
    ),
    commentsByPostId: new DataLoader(async (postIds) =>
      postIds.map((postId) => comments.filter((comment) => comment.postId === postId))
    )
  };
}
