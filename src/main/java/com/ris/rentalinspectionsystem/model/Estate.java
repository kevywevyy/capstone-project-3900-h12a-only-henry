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
    private Long agentId;
    @NotNull
    private final String title;
    @NotNull
    private final String description;
    @NotNull
    private final String propertyType;
    @NotNull
    private final String address;
    @NotNull
    private final Integer bedrooms;
    @NotNull
    private final Integer bathrooms;
    @NotNull
    private final Integer garages;
    @NotNull
    private final Integer landSqm;
    @NotNull
    private final Integer price;
    private final String images;
    private final Date inspectionDates;
    @NotNull
    private final Boolean open;

    @JsonCreator
    public Estate(
            @JsonProperty("id") Long id,
            @JsonProperty("agent_id") Long agentId,
            @JsonProperty("title") String title,
            @JsonProperty("description") String description,
            @JsonProperty("property_type") String propertyType,
            @JsonProperty("address") String address,
            @JsonProperty("n_bedrooms") Integer bedrooms,
            @JsonProperty("n_bathrooms") Integer bathrooms,
            @JsonProperty("n_garages") Integer garages,
            @JsonProperty("land_sqm") Integer landSqm,
            @JsonProperty("price") Integer price,
            @JsonProperty("images") String images,
            @JsonProperty("inspection_dates") Date inspectionDates,
            @JsonProperty("open") Boolean open
    ) {
        this.id = id;
        this.agentId = agentId;
        this.title = title;
        this.description = description;
        this.propertyType = propertyType;
        this.address = address;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.garages = garages;
        this.landSqm = landSqm;
        this.price = price;
        this.images = images;
        this.inspectionDates = inspectionDates;
        this.open = open;
    }
}