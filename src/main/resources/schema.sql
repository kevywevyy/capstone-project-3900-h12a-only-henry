CREATE TABLE IF NOT EXISTS estates(
    id BIGSERIAL NOT NULL,
    agent_id BIGINT NOT NULL,
    address TEXT NOT NULL,
    n_bedrooms INTEGER NOT NULL,
    n_bathrooms INTEGER NOT NULL,
    price INTEGER NOT NUll,
    inspection_dates DATE,

    PRIMARY KEY(id),
    CONSTRAINT fk_agent
        FOREIGN KEY(agent_id)
            REFERENCES agents(id)
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