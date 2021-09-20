package com.ris.rentalinspectionsystem.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Arrays;
import java.util.Date;
import java.util.Objects;

public class Estate {

    private final Long id;
    private final Long agent_id;
    private final String address;
    private final Double latitude;
    private final Double longitude;
    private final Integer n_bedrooms;
    private final Integer n_bathrooms;
    private final Integer price;
    private final Date [] inspection_dates;

    @JsonCreator
    public Estate(
            @JsonProperty("id") Long id,
            @JsonProperty("agent_id") Long agent_id,
            @JsonProperty("address") String address,
            @JsonProperty("latitude") Double latitude,
            @JsonProperty("longitude") Double longitude,
            @JsonProperty("n_bedrooms") Integer n_bedrooms,
            @JsonProperty("n_bathrooms") Integer n_bathrooms,
            @JsonProperty("price") Integer price,
            @JsonProperty("inspection_dates") Date [] inspection_dates
    ) {
        this.id = id;
        this.agent_id = agent_id;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.n_bedrooms = n_bedrooms;
        this.n_bathrooms = n_bathrooms;
        this.price = price;
        this.inspection_dates = inspection_dates;
    }

    // Getters
    @JsonProperty("id")
    public Long getId() { return id; }
    @JsonProperty("agent_id")
    public Long getAgent_id() { return agent_id; }
    @JsonProperty("address")
    public String getAddress() { return address; }
    @JsonProperty("latitude")
    public Double getLatitude() { return latitude; }
    @JsonProperty("longitude")
    public Double getLongitude() { return longitude; }
    @JsonProperty("n_bedrooms")
    public Integer getN_bedrooms() { return n_bedrooms; }
    @JsonProperty("n_bathrooms")
    public Integer getN_bathrooms() { return n_bathrooms; }
    @JsonProperty("price")
    public Integer getPrice() { return price; }
    @JsonProperty("id")
    public Date [] getInspection_dates() { return inspection_dates; }

    @Override
    public String toString() {
        return "Estate{" +
                "id=" + id +
                ", agent_id=" + agent_id +
                ", address='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", n_bedrooms=" + n_bedrooms +
                ", n_bathrooms=" + n_bathrooms +
                ", price=" + price +
                ", inspection_dates=" + Arrays.toString(inspection_dates) +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Estate estate = (Estate) o;
        return id.equals(estate.id) && agent_id.equals(estate.agent_id) && address.equals(estate.address) && latitude.equals(estate.latitude) && longitude.equals(estate.longitude) && n_bedrooms.equals(estate.n_bedrooms) && n_bathrooms.equals(estate.n_bathrooms) && price.equals(estate.price) && Arrays.equals(inspection_dates, estate.inspection_dates);
    }

    @Override
    public int hashCode() { return Objects.hash(id, agent_id, address, latitude, longitude, n_bedrooms, n_bathrooms, price);}
}
