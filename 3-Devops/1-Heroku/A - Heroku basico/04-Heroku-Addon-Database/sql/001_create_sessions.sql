CREATE TABLE IF NOT EXISTS deployment_sessions (
    id SERIAL PRIMARY KEY,
    environment VARCHAR(40) NOT NULL,
    release_version VARCHAR(50) NOT NULL,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT NOT NULL
);
