create schema if not exists core;

create table if not exists core.accounts (
  account_id uuid primary key,
  email text not null unique,
  status text not null,
  created_at timestamptz not null default now()
);
