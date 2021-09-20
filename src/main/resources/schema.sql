CREATE TABLE IF NOT EXISTS estates(
    id BIGSERIAL NOT NULL,
    agent_id BIGINT NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    n_bedrooms INTEGER NOT NULL,
    n_bathrooms INTEGER NOT NULL,
    price INTEGER NOT NUll,
    inspection_dates DATE[],

    PRIMARY KEY(id),
        CONSTRAINT fk_agent
            FOREIGN KEY(agent_id)
                REFERENCES agents(id)
);