package com.ris.rentalinspectionsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class Enquiry {

    @NotNull
    private final Topic topic;
    @NotNull
    private final String message;
    @NotNull
    @JsonProperty("first_name")
    private final String firstName;
    @NotNull
    @JsonProperty("last_name")
    private final String lastName;
    @NotNull
    private final String email;
    private final String phone;

    public Enquiry(
            String topic,
            String message,
            String firstName,
            String lastName,
            String email,
            String phone
    ) {
        this.topic = Topic.fromString(topic);
        this.message = message;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }
}


enum Topic {
    SCHEDULE_INSPECTION,
    RENTAL_RATE,
    OTHER;

    public static Topic fromString(String s) {
        for (Topic topic : Topic.values()) {
            if (topic.name().equalsIgnoreCase(s)) {
                return topic;
            }
        }
        return null;
    }
}