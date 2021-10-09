package com.ris.rentalinspectionsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    private Long id;
    @NotNull
    @JsonProperty("first_name")
    private final String firstName;
    @NotNull
    @JsonProperty("last_name")
    private final String lastName;
    @NotNull
    private final String email;
    private final String phone;
    @NotNull
    private final String address;

    public Agent(
            Long id,
            String firstName,
            String lastName,
            String email,
            String phone,
            String address
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}