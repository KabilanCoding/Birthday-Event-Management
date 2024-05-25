package com.main.happyhub_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.happyhub_backend.model.AddonModel;

public interface AddonRepository extends JpaRepository<AddonModel,Integer> {

}
