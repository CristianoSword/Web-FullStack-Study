INSERT INTO deployment_sessions (environment, release_version, notes)
VALUES
    ('staging', 'v1.0.0', 'Initial staging rollout using Heroku Postgres addon'),
    ('production', 'v1.0.0', 'Initial production rollout after validation')
ON CONFLICT DO NOTHING;
