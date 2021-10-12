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
    private final Integer nBedrooms;
    @NotNull
    private final Integer nBathrooms;
    @NotNull
    private final Integer nGarages;
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
            @JsonProperty("n_bedrooms") Integer nBedrooms,
            @JsonProperty("n_bathrooms") Integer nBathrooms,
            @JsonProperty("n_garages") Integer nGarages,
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
        this.nBedrooms = nBedrooms;
        this.nBathrooms = nBathrooms;
        this.nGarages = nGarages;
        this.landSqm = landSqm;
        this.price = price;
        this.images = images;
        this.inspectionDates = inspectionDates;
        this.open = open;
    }
}