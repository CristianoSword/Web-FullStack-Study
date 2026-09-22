CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  team TEXT NOT NULL
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  FOREIGN KEY(author_id) REFERENCES authors(id)
);

CREATE TABLE post_metrics (
  post_id INTEGER PRIMARY KEY,
  views INTEGER NOT NULL,
  likes INTEGER NOT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(id)
);
