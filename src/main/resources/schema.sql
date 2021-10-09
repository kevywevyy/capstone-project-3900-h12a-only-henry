CREATE TABLE IF NOT EXISTS estates(
    id BIGSERIAL NOT NULL
);

CREATE TABLE IF NOT EXISTS agents
(
    id         BIGSERIAL,
    first_name VARCHAR NOT NULL,
    last_name  VARCHAR NOT NULL,
    email      VARCHAR NOT NULL,
    phone      VARCHAR,
    address    VARCHAR NOT NULL
);