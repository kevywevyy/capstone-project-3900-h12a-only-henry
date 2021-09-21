package com.ris.rentalinspectionsystem.dao;

import com.ris.rentalinspectionsystem.model.Estate;
import com.ris.rentalinspectionsystem.model.EstateRegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Component
public class EstateDao {

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final EstateRowMapper estateRowMapper;

    @Autowired
    public EstateDao(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.estateRowMapper = new EstateRowMapper();
    }

    public List<Estate> getEstates() {
        return jdbcTemplate.query("SELECT * from estates", estateRowMapper);
    }

    public Estate getEstate(Long id) {
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT * from estates WHERE id = :id",
                    Map.of("id", id),
                    estateRowMapper
            );
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void createEstate(EstateRegistrationRequest estateRegistrationRequest) {
        jdbcTemplate.update("INSERT INTO estates(agent_id, address, latitude, longitude, n_bedrooms, n_bathrooms, price, inspection_dates) VALUES (:agent_id, :address, :latitude, :longitude, :n_bedrooms, :n_bathrooms, :price, :inspection_dates)",
                Map.of(
                        "agent_id", estateRegistrationRequest.getAgent_id(),
                        "address", estateRegistrationRequest.getAddress(),
                        "latitude", estateRegistrationRequest.getLatitude(),
                        "longitude", estateRegistrationRequest.getLongitude(),
                        "n_bedrooms", estateRegistrationRequest.getN_bedrooms(),
                        "n_bathrooms", estateRegistrationRequest.getN_bathrooms(),
                        "price", estateRegistrationRequest.getPrice(),
                        "inspection_dates", estateRegistrationRequest.getInspection_dates()
                )
        );
    }

    private static class EstateRowMapper implements RowMapper<Estate> {
        @Override
        public Estate mapRow(ResultSet resultSet, int i) throws SQLException {
            return new Estate(
                    resultSet.getLong("id"),
                    resultSet.getLong("agent_id"),
                    resultSet.getString("address"),
                    resultSet.getDouble("latitude"),
                    resultSet.getDouble("longitude"),
                    resultSet.getInt("n_bedrooms"),
                    resultSet.getInt("n_bathrooms"),
                    resultSet.getInt("price"),
                    resultSet.getDate("inspection_dates")
            );
        }
    }
}
