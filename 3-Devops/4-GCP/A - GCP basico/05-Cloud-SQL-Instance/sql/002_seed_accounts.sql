use studyapp;

insert into accounts (account_id, email, status)
values
  ('00000000-0000-0000-0000-000000000001', 'ops@study.example.com', 'active'),
  ('00000000-0000-0000-0000-000000000002', 'analytics@study.example.com', 'active')
on duplicate key update status = values(status);
