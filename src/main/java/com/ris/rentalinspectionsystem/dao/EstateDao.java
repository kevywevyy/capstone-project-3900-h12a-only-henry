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
import java.util.*;

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

        String filter = queryParams.isEmpty() ? "" : " AND " + String.join(" AND ", queryArgs);
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource(queryParams);

        return namedParameterJdbcTemplate.query(
                "SELECT * FROM estates WHERE agent_id = " + String.valueOf(id) + filter,
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

    public Estate patchEstate(Long agentId, Long estateId, Estate estate) {
        Estate originalEstate = getEstate(agentId, estateId);

        String title = originalEstate.getTitle();
        String description = originalEstate.getDescription();
        String propertyType = originalEstate.getPropertyType();
        String address = originalEstate.getAddress();
        Integer bedrooms = originalEstate.getBedrooms();
        Integer bathrooms = originalEstate.getBathrooms();
        Integer garages = originalEstate.getGarages();
        Integer landSqm = originalEstate.getLandSqm();
        Integer price = originalEstate.getPrice();
        String images = originalEstate.getImages();
        Date inspectionDates = originalEstate.getInspectionDates();
        Boolean open = originalEstate.getOpen();

        if (estate.getTitle() != null) {
            title = estate.getTitle();
        }
        if (estate.getDescription() != null) {
            description = estate.getDescription();
        }
        if (estate.getPropertyType() != null) {
            propertyType = estate.getPropertyType();
        }
        if (estate.getAddress() != null) {
            address = estate.getAddress();
        }
        if (estate.getBedrooms() != null) {
            bedrooms = estate.getBedrooms();
        }
        if (estate.getBathrooms() != null) {
            bathrooms = estate.getBathrooms();
        }
        if (estate.getGarages() != null) {
            garages = estate.getGarages();
        }
        if (estate.getLandSqm() != null) {
            landSqm = estate.getLandSqm();
        }
        if (estate.getPrice() != null) {
            price = estate.getPrice();
        }
        if (estate.getImages() != null) {
            images = estate.getImages();
        }
        if (estate.getInspectionDates() != null) {
            inspectionDates = estate.getInspectionDates();
        }
        if (estate.getOpen() != null) {
            open = estate.getOpen();
        }

        Estate newEstate = new Estate(
                estateId,
                agentId,
                title,
                description,
                propertyType,
                address,
                bedrooms,
                bathrooms,
                garages,
                landSqm,
                price,
                images,
                inspectionDates,
                open
        );

        return estatesRepository.save(newEstate);
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