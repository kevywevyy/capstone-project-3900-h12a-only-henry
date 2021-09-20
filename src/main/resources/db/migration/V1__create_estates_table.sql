CREATE TABLE IF NOT EXISTS estates(
    id BIGSERIAL NOT NULL,
    agent_id BIGSERIAL NOT NULL,
    address TEXT NOT NULL,
    coordinates POINT NOT NULL,
    n_bedrooms SERIAL NOT NULL,
    n_bathrooms SERIAL NOT NULL,
    price SERIAL NOT NUll,
    inspection_dates DATE[],


    PRIMARY KEY(id),
    CONSTRAINT fk_agent
        FOREIGN KEY(agent_id)
            REFERENCES agents(id)
);