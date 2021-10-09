package com.ris.rentalinspectionsystem.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
@Table("agents")
public class Agent {

    @Id
    @Null
    private final Long id;
    @NotNull
    private final String username;
    @NotNull
    private final String password;

    public Agent(
            Long id,
            String username,
            String password
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}