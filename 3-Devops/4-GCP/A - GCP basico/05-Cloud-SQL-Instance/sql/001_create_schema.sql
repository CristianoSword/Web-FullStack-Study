create database if not exists studyapp;
use studyapp;

create table if not exists accounts (
  account_id char(36) primary key,
  email varchar(255) not null unique,
  status varchar(32) not null,
  created_at timestamp not null default current_timestamp
);
