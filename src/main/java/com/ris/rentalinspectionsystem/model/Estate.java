package com.ris.rentalinspectionsystem.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.Date;

@Data
@Table("estates")
public class Estate {

    @Id
    @Null
    private final Long id;
    @NotNull
    private final Long agent_id;
    @NotNull
    private final String address;
    @NotNull
    private final Integer n_bedrooms;
    @NotNull
    private final Integer n_bathrooms;
    @NotNull
    private final Integer price;
    private final Date inspection_dates;

    @JsonCreator
    public Estate(
            @JsonProperty("id") Long id,
            @JsonProperty("agent_id") Long agent_id,
            @JsonProperty("address") String address,
            @JsonProperty("n_bedrooms") Integer n_bedrooms,
            @JsonProperty("n_bathrooms") Integer n_bathrooms,
            @JsonProperty("price") Integer price,
            @JsonProperty("inspection_dates") Date inspection_dates
    ) {
        this.id = id;
        this.agent_id = agent_id;
        this.address = address;
        this.n_bedrooms = n_bedrooms;
        this.n_bathrooms = n_bathrooms;
        this.price = price;
        this.inspection_dates = inspection_dates;
    }
}