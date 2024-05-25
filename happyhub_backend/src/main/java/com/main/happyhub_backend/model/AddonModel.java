package com.main.happyhub_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AddonModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int addonId;
    private String addonName;
    private String addonImageURL;
    private String addonDescription;
    private String addonPrice;
    private boolean isPublished;
    @ManyToOne
    @JsonIgnore
    private AdminModel adminModel;    
}
