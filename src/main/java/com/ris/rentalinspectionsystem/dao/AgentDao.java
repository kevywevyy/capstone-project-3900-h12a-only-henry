package com.ris.rentalinspectionsystem.dao;

import com.ris.rentalinspectionsystem.model.Agent;
import com.ris.rentalinspectionsystem.model.AgentRegistrationRequest;
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
public class AgentDao {

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final AgentRowMapper agentRowMapper;

    @Autowired
    public AgentDao(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.agentRowMapper = new AgentRowMapper();
    }

    public List<Agent> getAgents() {
        return jdbcTemplate.query("SELECT * from agents", agentRowMapper);
    }

    public Agent getAgent(Long id) {
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT * from agents WHERE id = :id",
                    Map.of("id", id),
                    agentRowMapper
            );
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void createAgent(AgentRegistrationRequest agentRegistrationRequest) {
        jdbcTemplate.update(
                "INSERT INTO agents(username, password) VALUES (:username, :password)",
                Map.of(
                        "username", agentRegistrationRequest.getUsername(),
                        "password", agentRegistrationRequest.getPassword()
                )
        );
    }



    private static class AgentRowMapper implements RowMapper<Agent> {

        @Override
        public Agent mapRow(ResultSet resultSet, int i) throws SQLException {
            return new Agent(
                    resultSet.getLong("id"),
                    resultSet.getString("username"),
                    resultSet.getString("password")
            );
        }
    }
}
