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
  ('18164707', 'https://avatars.githubusercontent.com/u/18164707?v=3','RhodesPeter')
ON CONFLICT DO NOTHING;

COMMIT;
