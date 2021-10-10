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
    private Long id;
    @Null
    private Long agent_id;
    @NotNull
    private final String title;
    @NotNull
    private final String description;
    @NotNull
    private final String property_type;
    @NotNull
    private final String address;
    @NotNull
    private final Integer n_bedrooms;
    @NotNull
    private final Integer n_bathrooms;
    @NotNull
    private final Integer n_garages;
    @NotNull
    private final Integer land_sqm;
    @NotNull
    private final Integer price;
    private final String images;
    private final Date inspection_dates;
    @NotNull
    private final Boolean open_status;

    @JsonCreator
    public Estate(
            @JsonProperty("id") Long id,
            @JsonProperty("agent_id") Long agent_id,
            @JsonProperty("title") String title,
            @JsonProperty("description") String description,
            @JsonProperty("property_type") String property_type,
            @JsonProperty("address") String address,
            @JsonProperty("n_bedrooms") Integer n_bedrooms,
            @JsonProperty("n_bathrooms") Integer n_bathrooms,
            @JsonProperty("n_garages") Integer n_garages,
            @JsonProperty("land_sqm") Integer land_sqm,
            @JsonProperty("price") Integer price,
            @JsonProperty("images") String images,
            @JsonProperty("inspection_dates") Date inspection_dates,
            @JsonProperty("open_status") Boolean open_status
    ) {
        this.id = id;
        this.agent_id = agent_id;
        this.title = title;
        this.description = description;
        this.property_type = property_type;
        this.address = address;
        this.n_bedrooms = n_bedrooms;
        this.n_bathrooms = n_bathrooms;
        this.n_garages = n_garages;
        this.land_sqm = land_sqm;
        this.price = price;
        this.images = images;
        this.inspection_dates = inspection_dates;
        this.open_status = open_status;
    }
}