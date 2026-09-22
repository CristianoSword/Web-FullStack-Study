INSERT INTO authors (id, name, team) VALUES
  (1, 'Bruna Sales', 'platform'),
  (2, 'Davi Nunes', 'growth'),
  (3, 'Erika Monteiro', 'platform');

INSERT INTO posts (id, title, author_id) VALUES
  (101, 'Batch SQL lookups', 1),
  (102, 'Avoid duplicate author queries', 1),
  (103, 'Measure resolver pressure', 2),
  (104, 'Optimize GraphQL metrics', 3);

INSERT INTO post_metrics (post_id, views, likes) VALUES
  (101, 1200, 88),
  (102, 980, 70),
  (103, 760, 51),
  (104, 1430, 104);
