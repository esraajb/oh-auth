
BEGIN;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id          SERIAL     PRIMARY KEY,
    githubid    TEXT       NOT NULL,
    imageurl    TEXT       NOT NULL,
    username    TEXT       UNIQUE
);

INSERT INTO users(githubid, imageurl, username) VALUES
  ('18500240','https://avatars.githubusercontent.com/u/18500240?v=3', 'denesnori'),
  ('18164707', 'https://avatars.githubusercontent.com/u/18164707?v=3','RhodesPeter'),
  ('17480329', 'https://avatars.githubusercontent.com/u/17480329?v=3', 'marko'),
  ('16775804','https://avatars.githubusercontent.com/u/16775804?v=3', 'Cleop'),
  ('16468314','https://avatars.githubusercontent.com/u/16468314?v=3', 'njsfield'),
  ('15656538','https://avatars.githubusercontent.com/u/15656538?v=3','jsms90')
ON CONFLICT DO NOTHING;

COMMIT;
