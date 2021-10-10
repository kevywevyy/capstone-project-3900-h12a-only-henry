CREATE TABLE IF NOT EXISTS agents
(
    id         BIGSERIAL,
    first_name VARCHAR NOT NULL,
    last_name  VARCHAR NOT NULL,
    email      VARCHAR NOT NULL,
    phone      VARCHAR,
    address    VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS estates(
    id BIGSERIAL,
    agent_id BIGINT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    property_type TEXT NOT NULL,
    address TEXT NOT NULL,
    n_bedrooms INTEGER NOT NULL,
    n_bathrooms INTEGER NOT NULL,
    n_garages INTEGER NOT NULL,
    land_sqm INTEGER NOT NULL,
    price INTEGER NOT NUll,
    images TEXT,
    inspection_dates DATE,
    open_status BOOLEAN NOT NULL,

    PRIMARY KEY(id),
        CONSTRAINT fk_agent
            FOREIGN KEY(agent_id)
                REFERENCES agents(id)
);