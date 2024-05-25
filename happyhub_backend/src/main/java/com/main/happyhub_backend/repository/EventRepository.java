package com.main.happyhub_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.happyhub_backend.model.EventModel;


public interface EventRepository extends JpaRepository<EventModel,Integer> {

}
