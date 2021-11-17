package com.ris.rentalinspectionsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
@Table("profiles")
public class Profile {

    @Id
    @Null
    private Long profileId;
    private final Long inspectorId;
    private final Integer bedrooms;
    private final Integer bathrooms;
    private final Integer garages;

    public Profile(
            Long profileId,
            Long inspectorId,
            Integer bedrooms,
            Integer bathrooms,
            Integer garages
    ) {
        this.profileId = profileId;
        this.inspectorId = inspectorId;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.garages = garages;
    }

}
