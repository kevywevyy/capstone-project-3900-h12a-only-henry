package com.ris.rentalinspectionsystem;

import com.ris.rentalinspectionsystem.model.Inspection;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.repository.QueryMappingConfiguration;
import org.springframework.data.jdbc.repository.config.DefaultQueryMappingConfiguration;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

@Configuration
public class RepositoryConfig {

    @Bean
    QueryMappingConfiguration rowMappers() {
        return new DefaultQueryMappingConfiguration()
                .registerRowMapper(Inspection.class, new InspectionRowMapper());
    }

    private static class InspectionRowMapper implements RowMapper<Inspection> {
        @Override
        public Inspection mapRow(ResultSet resultSet, int i) throws SQLException {
            return new Inspection(
                    resultSet.getLong("id"),
                    resultSet.getLong("estate_id"),
                    resultSet.getTimestamp("start_date").getTime() / 1000L,
                    resultSet.getTimestamp("end_date").getTime() / 1000L
            );
        }
    }
}
