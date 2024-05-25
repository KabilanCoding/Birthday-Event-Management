package com.main.happyhub_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import com.fasterxml.jackson.annotation.JsonIgnore;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class EventModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;
    private String eventName;
    private String applicantAddress;
    private int attendees;
    private String applicantMobile;
    private String reference;
    private String eventAddress;
    private String eventDescription;
    private String eventDate;
    private String eventTime;
    private boolean isCompleted;
    private int eventTheme;
    private String eventFoodId;
    private int addon;
    private String eventCost;
    @ManyToOne
    @JsonIgnore
    private UserModel userModel;
}
