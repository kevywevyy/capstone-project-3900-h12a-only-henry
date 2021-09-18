package com.ris.rentalinspectionsystem.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class Agent {

    private final Long id;
    private final String username;
    private final String password;

    @JsonCreator
    public Agent(
            @JsonProperty("id") Long id,
            @JsonProperty("username") String username,
            @JsonProperty("password") String password
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    // Getters
    @JsonProperty("id")
    public Long getId() {
        return id;
    }

    @JsonProperty("username")
    public String getUsername() {
        return username;
    }

    @JsonProperty("password")
    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "Agent{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Agent agent = (Agent) o;
        return Objects.equals(id, agent.id) && Objects.equals(username, agent.username) && Objects.equals(password, agent.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password);
    }
}