export function createOutboxRepository(database) {
  const insertOutboxStatement = database.prepare(`
    INSERT INTO outbox_events (id, aggregate_id, aggregate_type, event_type, topic, payload, status, retries, published_at, created_at)
    VALUES (@id, @aggregateId, @aggregateType, @eventType, @topic, @payload, @status, @retries, @publishedAt, @createdAt)
  `);

  const selectPendingStatement = database.prepare(`
    SELECT id, aggregate_id, aggregate_type, event_type, topic, payload, status, retries, published_at, created_at
    FROM outbox_events
    WHERE status = 'PENDING'
    ORDER BY created_at ASC
    LIMIT ?
  `);

  const selectAllStatement = database.prepare(`
    SELECT id, aggregate_id, aggregate_type, event_type, topic, payload, status, retries, published_at, created_at
    FROM outbox_events
    ORDER BY created_at DESC
  `);

  const updatePublishedStatement = database.prepare(`
    UPDATE outbox_events
    SET status = 'PUBLISHED',
        published_at = @publishedAt
    WHERE id = @id
  `);

  const markFailureStatement = database.prepare(`
    UPDATE outbox_events
    SET status = 'FAILED',
        retries = retries + 1
    WHERE id = @id
  `);

  function mapOutboxRow(row) {
    return {
      id: row.id,
      aggregateId: row.aggregate_id,
      aggregateType: row.aggregate_type,
      eventType: row.event_type,
      topic: row.topic,
      payload: JSON.parse(row.payload),
      status: row.status,
      retries: row.retries,
      publishedAt: row.published_at,
      createdAt: row.created_at
    };
  }

  function insertOutboxEvent(event) {
    insertOutboxStatement.run({
      ...event,
      payload: JSON.stringify(event.payload)
    });
  }

  function listPending(batchSize) {
    return selectPendingStatement.all(batchSize).map(mapOutboxRow);
  }

  function listAll() {
    return selectAllStatement.all().map(mapOutboxRow);
  }

  function markPublished({ id, publishedAt }) {
    updatePublishedStatement.run({ id, publishedAt });
  }

  function markFailed({ id }) {
    markFailureStatement.run({ id });
  }

  return {
    insertOutboxEvent,
    listPending,
    listAll,
    markPublished,
    markFailed
  };
}
