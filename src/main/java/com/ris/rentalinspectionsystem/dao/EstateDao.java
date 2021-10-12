package com.ris.rentalinspectionsystem.dao;

import com.ris.rentalinspectionsystem.model.Estate;
import com.ris.rentalinspectionsystem.repositories.EstatesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class EstateDao {

    private final EstatesRepository estatesRepository;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final EstateRowMapper estateRowMapper;

    @Autowired
    public EstateDao(
            EstatesRepository estatesRepository,
            NamedParameterJdbcTemplate namedParameterJdbcTemplate
    ) {
        this.estatesRepository = estatesRepository;
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
        this.estateRowMapper = new EstateRowMapper();
    }

    public List<Estate> getEstates(Map<String, Object> queryParams, Long id) {

        List<String> queryArgs = new ArrayList<>();

        for (Map.Entry<String, Object> queryParam : queryParams.entrySet()) {
            switch (queryParam.getKey()) {
                case "land_sqm_min":
                    queryArgs.add(String.format("%s >= :%s", "land_sqm", queryParam.getKey()));
                    break;
                case "land_sqm_max":
                    queryArgs.add(String.format("%s <= :%s", "land_sqm", queryParam.getKey()));
                    break;
                case "price_min":
                    queryArgs.add(String.format("%s >= :%s", "price", queryParam.getKey()));
                    break;
                case "price_max":
                    queryArgs.add(String.format("%s <= :%s", "price", queryParam.getKey()));
                    break;
                default:
                    queryArgs.add(String.format("%s = :%s", queryParam.getKey(), queryParam.getKey()));
                    break;
            }
        }

        String filter = queryParams.isEmpty() ? "" : " WHERE " + String.join(" AND ", queryArgs);
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource(queryParams);

        return namedParameterJdbcTemplate.query(
                "SELECT * FROM estates" + filter,
                sqlParameterSource,
                estateRowMapper
        );
    }

    public Estate getEstate(Long agentId, Long estateId) {
        return estatesRepository.findByAgentIdAndId(agentId, estateId);
    }

    public Estate createEstate(Long agentId, Estate estate) {
        estate.setAgentId(agentId);
        return estatesRepository.save(estate);
    }

    public Estate putEstate(Long agentId, Long estateId, Estate estate) {
        estate.setAgentId(agentId);
        estate.setId(estateId);
        return estatesRepository.save(estate);
    }

    private static class EstateRowMapper implements RowMapper<Estate> {

        @Override
        public Estate mapRow(ResultSet resultSet, int i) throws SQLException {
            return new Estate(
                    resultSet.getLong("id"),
                    resultSet.getLong("agent_Id"),
                    resultSet.getString("title"),
                    resultSet.getString("description"),
                    resultSet.getString("property_type"),
                    resultSet.getString("address"),
                    resultSet.getInt("bedrooms"),
                    resultSet.getInt("bathrooms"),
                    resultSet.getInt("garages"),
                    resultSet.getInt("land_sqm"),
                    resultSet.getInt("price"),
                    resultSet.getString("images"),
                    resultSet.getDate("inspection_dates"),
                    resultSet.getBoolean("open")
            );
        }
    }
}