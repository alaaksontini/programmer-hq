// create a table for subject of questions in postgres
CREATE TABLE subjects (
  id uuid PRIMARY KEY NOT NULL,
  name text NOT NULL,
  logo text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);


CREATE TABLE questions (
  id uuid PRIMARY KEY NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  subject_id uuid NOT NULL REFERENCES subjects(id),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);
