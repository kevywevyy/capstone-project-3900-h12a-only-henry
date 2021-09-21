package com.ris.rentalinspectionsystem.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.Objects;

public class EstateRegistrationRequest {
    private final Long agent_id;
    private final String address;
    private final Double latitude;
    private final Double longitude;
    private final Integer n_bedrooms;
    private final Integer n_bathrooms;
    private final Integer price;
    private final Date inspection_dates;

    @JsonCreator
    public EstateRegistrationRequest(
            @JsonProperty("agent_id") Long agent_id,
            @JsonProperty("address") String address,
            @JsonProperty("latitude") Double latitude,
            @JsonProperty("longitude") Double longitude,
            @JsonProperty("n_bedrooms") Integer n_bedrooms,
            @JsonProperty("n_bathrooms") Integer n_bathrooms,
            @JsonProperty("price") Integer price,
            @JsonProperty("inspection_dates") Date inspection_dates
    ) {
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
    @JsonProperty("agent_id")
    public Long getAgent_id() {
        return agent_id;
    }

    @JsonProperty("address")
    public String getAddress() {
        return address;
    }

    @JsonProperty("latitude")
    public Double getLatitude() {
        return latitude;
    }

    @JsonProperty("longitude")
    public Double getLongitude() {
        return longitude;
    }

    @JsonProperty("n_bedrooms")
    public Integer getN_bedrooms() {
        return n_bedrooms;
    }

    @JsonProperty("n_bathrooms")
    public Integer getN_bathrooms() {
        return n_bathrooms;
    }

    @JsonProperty("price")
    public Integer getPrice() {
        return price;
    }

    @JsonProperty("inspection_dates")
    public Date getInspection_dates() {
        return inspection_dates;
    }

    @Override
    public String toString() {
        return "EstateRegistrationRequest{" +
                "agent_id=" + agent_id +
                ", address='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", n_bedrooms=" + n_bedrooms +
                ", n_bathrooms=" + n_bathrooms +
                ", price=" + price +
                ", inspection_dates=" + inspection_dates +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EstateRegistrationRequest that = (EstateRegistrationRequest) o;
        return agent_id.equals(that.agent_id) && address.equals(that.address) && latitude.equals(that.latitude) && longitude.equals(that.longitude) && n_bedrooms.equals(that.n_bedrooms) && n_bathrooms.equals(that.n_bathrooms) && price.equals(that.price) && Objects.equals(inspection_dates, that.inspection_dates);
    }

    @Override
    public int hashCode() {
        return Objects.hash(agent_id, address, latitude, longitude, n_bedrooms, n_bathrooms, price, inspection_dates);
    }
}
