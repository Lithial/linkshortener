CREATE TABLE IF NOT EXISTS links(
            linkId serial PRIMARY KEY NOT NULL,
            link varchar NOT NULL,
            code varchar NOT NULL,
      dateCreated date NOT NULL
);

